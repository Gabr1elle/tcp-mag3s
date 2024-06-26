import { Sequelize } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const posts = await Blog.Post.findAll({
		attributes: ['id', 'slug', 'title', 'subtitle', 'content', 'image', 'video', 'createdAt', 'createdAtFull', 'views',
			[Sequelize.literal('(SELECT COUNT(*) FROM `likes` WHERE `likes`.`postId` = `posts`.`id`)'), 'likeCount'], // get like count for each post
			[Sequelize.literal('(SELECT `name` FROM `categories` WHERE `categories`.`id` = `posts`.`categoryId`)'), 'category'] // get category name for each post
		]
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
