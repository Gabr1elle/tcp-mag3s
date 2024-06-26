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
		attributes: ['id', 'title', 'subtitle', 'content', 'image', 'views', 'video', 'slug', 'createdAt', 'createdAtFull',
			[Sequelize.literal('(SELECT COUNT(*) FROM `blog_likes` WHERE `blog_likes`.`blogPostId` = `blog_posts`.`id`)'), 'likeCount'], // get like count for each post
			[Sequelize.literal(`(SELECT EXISTS(SELECT 1 FROM blog_likes WHERE blog_likes.blogPostId = blog_posts.id AND blog_likes.userId = '${userId}' LIMIT 1))`), 'userLiked'], // check if user current liked the post
			[Sequelize.literal('(SELECT `name` FROM `blog_categories` WHERE `blog_categories`.`id` = `blog_posts`.`blogCategoryId`)'), 'category'], // get category name for each post
		],
		include: [
			{
				model: Blog.Comment,
				separate: true,
				order: [['createdAt', 'ASC']],
				as: 'comments',
				attributes: ['id', 'content', 'createdAt'],
				where: {
					parentId: null,
				},
				required: false,
				include: [
					{
						model: Blog.User,
						as: 'UserComents',
						attributes: ['id', 'nickname', 'profileImage',
							[Sequelize.literal(`(SELECT blog_comments.userId = '${userId}')`), 'madeByCurrentUser'], // if userId is the owner of the coment and reply, add madeByCurrentUser
							[Sequelize.literal('(SELECT COUNT(*) FROM `blog_likes` WHERE `blog_likes`.`blogCommentId` = `blog_comments`.`id`)'), 'likeCount'], // get like count for each comment
							[Sequelize.literal(`(SELECT EXISTS(SELECT 1 FROM blog_likes WHERE blog_likes.blogCommentId = blog_comments.id AND blog_likes.userId = '${userId}' LIMIT 1))`), 'userLiked']], // check if user current liked the comment
					},
					{
						model: Blog.Comment,
						separate: true,
						order: [['createdAt', 'ASC']],
						as: 'Replies',
						attributes: ['id', 'parentId', 'content', 'createdAt'],
						include: [
							{
								model: Blog.User,
								as: 'UserComents',
								attributes: ['id', 'nickname', 'profileImage',
									[Sequelize.literal(`(SELECT blog_comments.userId = '${userId}')`), 'madeByCurrentUser'], // if userId is the owner of the coment and reply, add madeByCurrentUser
									[Sequelize.literal('(SELECT COUNT(*) FROM `blog_likes` WHERE `blog_likes`.`blogCommentId` = `blog_comments`.`id`)'), 'likeCount'], // get like count for each comment
									[Sequelize.literal(`(SELECT EXISTS(SELECT 1 FROM blog_likes WHERE blog_likes.blogCommentId = blog_comments.id AND blog_likes.userId = '${userId}' LIMIT 1))`), 'userLiked']], // check if user current liked the comment
							},
						],
					},
				],
			},
		],
		group: ['blog_posts.id'],
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
