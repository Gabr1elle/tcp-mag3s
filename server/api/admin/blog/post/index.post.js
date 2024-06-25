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

	const post = await Blog.Post.create({
		title: fields.otherFields.title,
		subtitle: fields.otherFields.subtitle,
		content: fields.otherFields.content,
		image: dataFile.image ? dataFile.image.urlFile : null,
		video: dataFile.video ? dataFile.video.urlFile : null,
		categoryId: fields.otherFields.categoryId,
		createdUserAdminId: event.context.auth.id,
	});

	if (!post) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao criar post!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Post criado com sucesso!',
		data: post,
	};
});
