import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//verify if the body.content is empty
	if (!body.content) {
		throw createError({
			statusCode: 406,
			message: 'Conteúdo do comentário é obrigatório!',
			data: null,
		});
	}

	// limited content length to 500 characters
	if (body.content.length > 500) {
		throw createError({
			statusCode: 406,
			message: 'Conteúdo do comentário ultrapassou o limite de 500 caracteres!',
			data: null,
		});
	}

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

	//obtain the user by id
	const user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	// verify if the user exists
	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Não existe usuário para comentar!',
			data: null,
		});
	}

	//validate if comment exists by parentId
	if (body.parentId) {
		const parentComment = await Blog.Comment.findByPk(body.parentId);
		if (!parentComment) {
			throw createError({
				statusCode: 406,
				message: 'Para responder a um comentário, informe um ID do comentário principal válido!',
				data: null,
			});
		}
	}

	//create the comment
	const comment = await Blog.Comment.create({
		content: body.content,
		blogPostId: body.postId,
		userId: user.id,
		parentId: body.parentId || null,
	});

	if (!comment) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao criar comentário!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Comentário criado com sucesso!',
		data: comment,
	};
});
