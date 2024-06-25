import { Video } from '../../../../models/Video.model';

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
	let post = await Video.Post.findByPk(body.postId);
	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Post não encontrado!',
			data: null,
		});
	}

	// get user idIncentive in table user
	const user = await Video.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	//validate the user exists
	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Usuário não encontrado!',
			data: null,
		});
	}

	// increment count column view in post table
	post = await post.increment('views');

	// return success message
	return {
		statusCode: 200,
		message: 'Visualização registrada com sucesso!',
		data: {
			views: post.views + 1,
		},
	};

});
