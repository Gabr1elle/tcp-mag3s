import { Sequelize } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async () => {
	const posts = await Blog.Post.findAll({
		order: [['createdAt', 'DESC']],
		attributes: ['id', 'slug', 'title', 'subtitle', 'content', 'image', 'video', 'createdAt', 'createdAtFull', 'views',
			[Sequelize.literal('(SELECT COUNT(*) FROM `blog_likes` WHERE `blog_likes`.`blogPostId` = `blog_posts`.`id`)'), 'likeCount'], // get like count for each post
			[Sequelize.literal('(SELECT `name` FROM `blog_categories` WHERE `blog_categories`.`id` = `blog_posts`.`blogCategoryId`)'), 'category'] // get category name for each post
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
