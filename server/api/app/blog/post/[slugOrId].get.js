import { Sequelize, Op } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const params = getRouterParams(event, 'slugOrId');

	let userIncentive = null;
	let userId = null;
	if (query.incentiveTokenUser) {
		//get user id from incentive system
		userIncentive = await getUserIncentive(event);

		//get user id from blog system
		let getUser = await Blog.User.findOne({
			where: {
				incentiveId: userIncentive.id,
			},
		});

		if (getUser) {
			userId = getUser.id;
		}
	}

	const post = await Blog.Post.findOne({
		where: {
			[Op.or]: [
				{ slug: params.slugOrId },
				{ id: params.slugOrId },
			],
		},
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'slug', 'createdAt',
			[Sequelize.literal('(SELECT COUNT(*) FROM `likes` WHERE `likes`.`postId` = `posts`.`id`)'), 'likeCount'],
			[Sequelize.literal('(SELECT `name` FROM `categories` WHERE `categories`.`id` = `posts`.`categoryId`)'), 'category'],
			[Sequelize.literal(`(SELECT EXISTS(SELECT 1 FROM likes WHERE likes.postId = posts.id AND likes.userId = '${userId}' LIMIT 1))`), 'userLiked'],
		],
		include: [
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
						attributes: ['id', 'nickname', 'profileImage'],
					},
					{
						model: Blog.Comment,
						as: 'Replies',
						attributes: ['id', 'parentId', 'content', 'createdAt'],
						include: [
							{
								model: Blog.User,
								as: 'UserComents',
								attributes: ['id', 'nickname', 'profileImage'],
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

	// if userId is the owner of the coment and reply, add madeByCurrentUser
	post.get({ plain: true }).comments.forEach((comment) => {
		if (comment.UserComents.id === userId) {
			comment.UserComents.madeByCurrentUser = true;
		} else {
			comment.UserComents.madeByCurrentUser = false;
		}

		comment.Replies.forEach((reply) => {
			if (reply.UserComents.id === userId) {
				reply.UserComents.madeByCurrentUser = true;
			} else {
				reply.UserComents.madeByCurrentUser = false;
			}
		});
	});

	return {
		statusCode: 200,
		message: 'Post obtido com sucesso!',
		data: {
			...post.get({ plain: true }),
			userLiked: !!post.get('userLiked'),
			category: post.get('category'),
		},
	};
});
