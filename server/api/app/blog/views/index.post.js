import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	//verify if the body.postId is empty
	if (!body.postId) {
		throw createError({
			statusCode: 406,
			message: 'ID do post é obrigatório!',
			data: null,
		});
	}

	//validate the post exists
	let post = await Blog.Post.findByPk(body.postId);
	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Post não encontrado!',
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
