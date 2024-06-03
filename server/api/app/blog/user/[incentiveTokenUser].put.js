import { Op } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//check if user already exists
	let user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Usuário do blog não encontrado!',
			data: null,
		});
	}

	//validate nickname to not be empty
	if (!body.nickname) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário é obrigatório!',
			data: null,
		});
	}

	//validate nickname to not carracters special or spaces return error
	if (body.nickname.match(/[^a-zA-Z0-9]/g)) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário não pode conter caracteres especiais ou espaços!',
			data: null,
		});
	}

	//verify if incentiveId or nickname or email already exists
	user = await Blog.User.findOne({
		where: {
			nickname: body.nickname
		}
	});

	// if user already exists and is different from the user that is being edited
	if (user && user.incentiveId !== userIncentive.id) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário já existe, por favor escolha outro!',
			data: null,
		});
	}

	//put user by nickname
	user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
		attributes: ['id', 'nickname'],
	});
	user.set({
		nickname: body.nickname,
	});
	await user.save();

	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao editar usuário!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Usuário editado com sucesso!',
		data: user,
	};
});
