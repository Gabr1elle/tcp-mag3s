import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// get post by ID
	const idPost = getRouterParam(event, 'id');
	const post = await Blog.Post.findByPk(idPost, {
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'video', 'createdAt'],
		include: [
			{
				model: Blog.Category,
				attributes: ['name'],
			},
			{
				model: Blog.Comment,
				attributes: ['id', 'content', 'createdAt'],
				where: {
					parentId: null,
				},
				include: [
					{
						model: Blog.User,
						as: 'UserComents',
						attributes: ['nickname'],
					},
					{
						model: Blog.Comment,
						as: 'Replies',
						attributes: ['id', 'content', 'createdAt'],
						include: [
							{
								model: Blog.User,
								as: 'UserComents',
								attributes: ['nickname'],
							},
						],
					},
				],
			},
			{
				model: Blog.Like,
				attributes: ['id'],
			},
		],
	});

	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Post não encontrado!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Post obtido com sucesso!',
		data: post,
	};
});
