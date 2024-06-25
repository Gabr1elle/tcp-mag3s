import { Sequelize, Op } from 'sequelize';
import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// get post by slug
	const params = getRouterParams(event, 'slugOrId');

	const post = await Video.Post.findOne({
		where: {
			[Op.or]: [
				{ slug: params.slugOrId },
				{ id: params.slugOrId },
			],
		},
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'slug', 'createdAt',
			[Sequelize.literal('(SELECT COUNT(*) FROM `likes` WHERE `likes`.`postId` = `posts`.`id`)'), 'likeCount'],
			[Sequelize.literal('(SELECT `name` FROM `categories` WHERE `categories`.`id` = `posts`.`categoryId`)'), 'category']
		],
		include: [
			{
				model: Video.Comment,
				attributes: ['id', 'content', 'createdAt'],
				where: {
					parentId: null,
				},
				required: false,
				include: [
					{
						model: Video.User,
						as: 'UserComents',
						attributes: ['nickname'],
					},
					{
						model: Video.Comment,
						as: 'Replies',
						attributes: ['id', 'content', 'createdAt'],
						include: [
							{
								model: Video.User,
								as: 'UserComents',
								attributes: ['nickname'],
							},
						],
					},
				],
			},
		],
		group: ['posts.id'],
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
		data: {
			...post.get({ plain: true }),
			category: post.get('category'),
		},
	};
});
