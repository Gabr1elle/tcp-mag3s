import { Sequelize } from 'sequelize';
import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	const posts = await Video.Post.findAll({
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'createdAt', 'createdAtFull',
			[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likeCount']
		],
		include: [
			{
				model: Video.Category,
				attributes: ['name'],
			},
			{
				model: Video.Like,
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
