import { Op } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//create nickname based on email without @ + 4 numerbes random, remove special characters and spaces
	let nickname = userIncentive.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 9000 + 1000);

	//verify if incentiveId or nickname or email already exists
	const user = await Blog.User.findOne({
		where: {
			[Op.or]: [
				{ incentiveId: userIncentive.id },
				{ nickname: nickname }
			]
		}
	});

	if (user) {
		throw createError({
			statusCode: 406,
			message: 'Usuário já existe!',
			data: null,
		});
	}

	//create new user
	const newUser = await Blog.User.create({
		incentiveId: userIncentive.id,
		nickname: nickname,
	});

	if (!newUser) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao criar usuário!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Usuário criado com sucesso!',
		data: newUser,
	};
});
