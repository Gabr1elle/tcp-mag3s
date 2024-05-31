import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const posts = await Blog.Post.findAll({
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'video', 'createdAt'],
		include: [
			{
				model: Blog.Category,
				attributes: ['name'],
			},
			{
				model: Blog.Comment,
				attributes: ['id', 'content', 'createdAt'],
			},
			{
				model: Blog.Comment,
				as: 'Replies',
				include: [
					{
						model: Blog.User,
						as: 'UserComents',
						attributes: ['nickname'],
					},
				],
			},
			{
				model: Blog.Like,
				attributes: ['id'],
			},
		],
	});

	if (!posts.length) {
		throw createError({
			statusCode: 406,
			message: 'Não existem posts cadastrados!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Posts obtidos com sucesso!',
		data: posts,
	};
});
