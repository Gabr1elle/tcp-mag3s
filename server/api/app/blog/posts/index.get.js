import { Sequelize } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const posts = await Blog.Post.findAll({
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'slug', 'createdAt', 'createdAtFull',
			[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likeCount']
		],
		include: [
			{
				model: Blog.Category,
				attributes: ['name'],
			},
			{
				model: Blog.Like,
				attributes: [],
			},
		],
		group: ['posts.id']
	});

	if (!posts.length) {
		throw createError({
			statusCode: 406,
			message: 'Não existem posts cadastrados!',
			data: null,
		});
	}

	// Modifica os posts para incluir a categoria
	const modifiedPosts = posts.map(post => ({
		...post.toJSON(),
		category: post.category.name
	}));

	return {
		statusCode: 200,
		message: 'Posts obtidos com sucesso!',
		data: modifiedPosts,
	};
});
