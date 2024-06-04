import { Sequelize, Op } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// get post by slug
	const params = getRouterParams(event, 'slugOrId');

	console.log(params.slugOrId)
	const post = await Blog.Post.findOne({
		where: {
			[Op.or]: [
				{ slug: params.slugOrId },
				{ id: params.slugOrId },
			],
		},
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'createdAt',
			[Sequelize.literal('(SELECT COUNT(*) FROM `likes` WHERE `likes`.`postId` = `posts`.`id`)'), 'likeCount']
		],
		include: [
			{
				model: Blog.Like,
				attributes: [],
			},
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
				required: false,
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
			likes: post.get('likeCount'),
		},
	};
});
