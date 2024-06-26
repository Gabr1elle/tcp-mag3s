import { Blog } from '../../../../models/Blog.model';

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
	const post = await Blog.Post.findOne({ where: { id: params.id }, attributes: ['id', 'title', 'slug', 'image', 'video'] });
	if (!post) {
		throw createError({
			statusCode: 404,
			message: 'Post não encontrado!',
			data: null,
		});
	}

	// Deletar a imagem do post
	if (post.dataValues.image) {
		console.info('deletando imagem do post');
		let fileName = post.dataValues.image.split('/').pop();

		// Delete in Google Cloud Storage
		try {
			await deleteFileInGCS(fileName, 'blogAssets/');
		} catch (error) {
			return error;
		}
	}

	// Deletar o vídeo do post
	if (post.dataValues.video) {
		console.info('deletando vídeo do post');
		let fileName = post.dataValues.video.split('/').pop();

		// Delete in Google Cloud Storage
		try {
			await deleteFileInGCS(fileName, 'blogAssets/');
		} catch (error) {
			return error;
		}
	}

	// Deletar o post
	await post.destroy();

	return {
		status: 200,
		message: 'Post deletado com sucesso!',
		data: {
			id: post.id,
			title: post.title,
			slug: post.slug,
		},
	};
});
