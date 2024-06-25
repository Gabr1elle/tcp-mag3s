import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// Listar todos os posts
	const posts = await Video.Post.findAll({
		order: [['updatedAt', 'DESC']],
		include: [
			{
				model: Video.Category,
				attributes: ['id', 'name'],
			},
		],
	});

	if (!posts.length) {
		throw createError({
			statusCode: 404,
			message: 'Nenhum post criado ainda!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Posts listados com sucesso!',
		data: posts,
	};
});
