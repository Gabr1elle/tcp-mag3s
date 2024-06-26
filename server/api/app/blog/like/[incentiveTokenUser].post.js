import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//verify if the body.postId and body.commentId is empty
	if (!body.postId && !body.commentId) {
		throw createError({
			statusCode: 406,
			message: 'ID do post ou comentário é obrigatório!',
			data: null,
		});
	}

	//validate the post or comment exists
	let postOrComment;
	if (body.postId) {
		postOrComment = await Blog.Post.findOne({
			where: {
				id: body.postId,
			},
		});

		if (!postOrComment) {
			throw createError({
				statusCode: 406,
				message: 'Post não encontrado!',
				data: null,
			});
		}
	} else {
		postOrComment = await Blog.Comment.findOne({
			where: {
				id: body.commentId,
			},
		});

		if (!postOrComment) {
			throw createError({
				statusCode: 406,
				message: 'Comentário não encontrado!',
				data: null,
			});
		}
	}

	// get user idIncentive in table user
	const user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	//validate the user exists
	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Não existe usuário para dar like!',
			data: null,
		});
	}

	//validate the like exists
	let like = await Blog.Like.findOne({
		attributes: ['id', `${body.postId ? 'blogPostId' : 'blogCommentId'}`],
		where: {
			userId: user.id,
			[body.postId ? 'blogPostId' : 'blogCommentId']: postOrComment.id,
		},
	});

	//if like exists, delete it
	if (like) {
		await like.destroy();

		return {
			statusCode: 200,
			message: 'Você deu deslike 😢!', data: {
				...like.toJSON(),
				userLiked: 0,
			},
		};
	} else {
		//if like not exists, create it
		await Blog.Like.create({
			userId: user.id,
			[body.postId ? 'blogPostId' : 'blogCommentId']: postOrComment.id,
		});

		like = await Blog.Like.findOne({
			attributes: ['id', `${body.postId ? 'blogPostId' : 'blogCommentId'}`],
			where: {
				userId: user.id,
				[body.postId ? 'blogPostId' : 'blogCommentId']: postOrComment.id,
			},
		});

		return {
			statusCode: 200,
			message: 'Você deu like 🤙!',
			data: {
				...like.toJSON(),
				userLiked: 1,
			},
		};
	}

});
