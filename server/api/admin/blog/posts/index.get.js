import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// Listar todos os posts
	const posts = await Blog.Post.findAll({
		include: [
			{
				model: Blog.Category,
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
		body: posts,
	};
});
