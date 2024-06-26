import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// Form Data
	let fields;
	try {
		fields = await fileHandling(event, true, ['png', 'jpg', 'jpeg', 'mp4', 'webm', 'ogg'], 2, 35 * 1024 * 1024, 10);
	} catch (error) {
		return error;
	}

	// const body = await readBody(event);
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
	if (!fields.otherFields.title) {
		throw createError({
			statusCode: 406,
			message: 'Título é obrigatório!',
			data: null,
		});
	}

	if (!fields.otherFields.subtitle) {
		throw createError({
			statusCode: 406,
			message: 'Subtítulo é obrigatório!',
			data: null,
		});
	}

	if (!fields.otherFields.content) {
		throw createError({
			statusCode: 406,
			message: 'Conteúdo é obrigatório!',
			data: null,
		});
	}

	// Verificar se a categoria foi informada corretamente
	const category = await Blog.Category.findOne({
		where: {
			id: fields.otherFields.categoryId,
		},
	});

	if (!category) {
		throw createError({
			statusCode: 406,
			message: 'Categoria não encontrada!',
			data: null,
		});
	}

	// Buscar post
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

	let dataFile = { image: null, video: null };
	if (fields.files.image || fields.files.video) {
		// Save in Google Cloud Storage
		try {
			if (fields.files.image) {
				// save image
				const urlFileSavedPromise = saveFileInGCS(fields.files.image[0], 'blog/');
				dataFile.image = {
					fileName: urlFileSavedPromise.fileName,
					urlFile: await urlFileSavedPromise.urlFile,
				};
				dataFile.image.urlFile = dataFile.image.urlFile.split('?')[0];
			}

			if (fields.files.video) {
				// save video
				const urlFileSavedPromise = saveFileInGCS(fields.files.video[0], 'blog/');
				dataFile.video = {
					fileName: urlFileSavedPromise.fileName,
					urlFile: await urlFileSavedPromise.urlFile,
				};
				dataFile.video.urlFile = dataFile.video.urlFile.split('?')[0];
			}
		} catch (error) {
			return error;
		}
	}

	// Editar post and return result
	post.set({
		title: fields.otherFields.title,
		subtitle: fields.otherFields.subtitle,
		content: fields.otherFields.content,
		image: dataFile.image ? dataFile.image.urlFile : post.image,
		video: dataFile.video ? dataFile.video.urlFile : post.video,
		categoryId: fields.otherFields.categoryId,
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
