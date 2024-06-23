import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//verify if the body.postId is empty
	if (!body.postId) {
		throw createError({
			statusCode: 406,
			message: 'ID do post é obrigatório!',
			data: null,
		});
	}

	//validate the post exists
	const post = await Blog.Post.findByPk(body.postId);
	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Post não encontrado!',
			data: null,
		});
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
		attributes: ['id', 'postId'],
		where: {
			userId: user.id,
			postId: post.id,
		},
	});

	//if like exists, delete it
	if (like) {
		await like.destroy();

		return {
			statusCode: 200,
			message: 'Você deu deslike 😢!',
			data: like,
		};
	} else {
		//if like not exists, create it
		like = await Blog.Like.create({
			userId: user.id,
			postId: post.id,
		});

		return {
			statusCode: 200,
			message: 'Você deu like 🤙!',
			data: like,
		};
	}

});
