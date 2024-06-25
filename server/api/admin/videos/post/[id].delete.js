import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const params = getRouterParams(event, 'id');

	// Verificar se o parâmetro foi informado
	if (!params.id) {
		throw createError({
			statusCode: 406,
			message: 'ID do Post é obrigatório!',
			data: null,
		});
	}

	// Buscar o post e verificar se ele existe
	const post = await Video.Post.findOne({where: {id: params.id}, attributes: ['id', 'title', 'slug']});
	if (!post) {
		throw createError({
			statusCode: 404,
			message: 'Post não encontrado!',
			data: null,
		});
	}

	// Deletar o post
	await post.destroy();

	return {
		status: 200,
		message: 'Post deletado com sucesso!',
		data: post,
	};
});
