import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//check if user already exists
	const user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
		attributes: ['id', 'nickname', 'incentiveId'],
	});

	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Usuário do blog não encontrado!',
			data: null,
		});
	}

	//delete user by userIncentive.id
	await Blog.User.destroy({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	return {
		statusCode: 201,
		message: 'Usuário deletado com sucesso!',
		data: user,
	};
});
