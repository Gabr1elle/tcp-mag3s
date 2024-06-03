import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const body = await readBody(event);
	const params = getRouterParams(event, 'id');

	// Verificar se o parâmetro foi informado
	if (!params.id) {
		throw createError({
			statusCode: 406,
			message: 'ID do Post é obrigatório!',
			data: null,
		});
	}

	// Verificar se os campos foram informados
	if (!body.title) {
		throw createError({
			statusCode: 406,
			message: 'Título é obrigatório!',
			data: null,
		});
	}

	if (!body.subtitle) {
		throw createError({
			statusCode: 406,
			message: 'Subtítulo é obrigatório!',
			data: null,
		});
	}

	if (!body.content) {
		throw createError({
			statusCode: 406,
			message: 'Conteúdo é obrigatório!',
			data: null,
		});
	}

	if (!body.image) {
		throw createError({
			statusCode: 406,
			message: 'Imagem é obrigatória!',
			data: null,
		});
	}

	if (!body.video) {
		throw createError({
			statusCode: 406,
			message: 'Vídeo é obrigatório!',
			data: null,
		});
	}

	// Verificar se a categoria foi informada corretamente
	const category = await Blog.Category.findOne({
		where: {
			id: body.categoryId,
		},
	});

	if (!category) {
		throw createError({
			statusCode: 406,
			message: 'Categoria não encontrada!',
			data: null,
		});
	}

	// Editar post and return result
	const post = await Blog.Post.findOne({
		where: {
			id: params.id
		},
		attributes: [
			'id', 'title', 'subtitle', 'content', 'image', 'video', 'categoryId', 'lastUpdateUserAdminId'
		]
	});

	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Post não encontrado!',
			data: null,
		});
	}

	post.set({
		title: body.title,
		subtitle: body.subtitle,
		content: body.content,
		image: body.image,
		video: body.video,
		categoryId: body.categoryId,
		lastUpdateUserAdminId: event.context.auth.id,
	});

	await post.save();

	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao editar post!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Post editado com sucesso!',
		data: post,
	};
});
