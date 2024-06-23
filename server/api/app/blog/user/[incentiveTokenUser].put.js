import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// Form Data
	let fields;
	try {
		fields = await fileHandling(event, true, ['png', 'jpg', 'jpeg'], 1, 2 * 1024 * 1024, 2);
	} catch (error) {
		return error;
	}

	//get user id from incentive system
	const userIncentive = await getUserIncentive(event);

	//check if user already exists
	let user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
	});

	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Usuário do blog não encontrado!',
			data: null,
		});
	}

	//validate nickname to not be empty
	if (!fields.otherFields.nickname) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário é obrigatório!',
			data: null,
		});
	}

	//validate nickname to not carracters special or spaces return error
	if (fields.otherFields.nickname.match(/[^a-zA-Z0-9]/g)) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário não pode conter caracteres especiais ou espaços!',
			data: null,
		});
	}

	//verify if incentiveId or nickname already exists
	user = await Blog.User.findOne({
		where: {
			nickname: fields.otherFields.nickname,
		}
	});

	// if user already exists and is different from the user that is being edited
	if (user && user.incentiveId !== userIncentive.id) {
		throw createError({
			statusCode: 406,
			message: 'Nome de usuário já existe, por favor escolha outro!',
			data: null,
		});
	}

	let dataFile;
	if (fields.files.imageProfile) {
		// Save in Google Cloud Storage
		try {
			const urlFileSavedPromise = saveFileInGCS(fields.files.imageProfile[0], 'profilesImage/');
			dataFile = {
				fileName: urlFileSavedPromise.fileName,
				urlFile: await urlFileSavedPromise.urlFile,
			};
			dataFile.urlFile = dataFile.urlFile.split('?')[0]
		} catch (error) {
			return error;
		}

		//get user by id
		user = await Blog.User.findOne({
			where: {
				incentiveId: userIncentive.id,
			},
		});

		//delete old image
		if (user.profileImage) {
			console.info('deletando imagem antiga');
			let fileName = user.profileImage.split('/').pop();

			// Delete in Google Cloud Storage
			try {
				await deleteFileInGCS(fileName, 'profilesImage/');
			} catch (error) {
				return error;
			}

			//put user by id and update profile image
			user.set({
				profileImage: null,
			});
			await user.save();
		}
	} else {
		//get user by id
		user = await Blog.User.findOne({
			where: {
				incentiveId: userIncentive.id,
			},
		});
		// if user does not send image, keep the old image
		if (user.profileImage) {
			dataFile = {
				urlFile: user.profileImage,
			};
		}
	}

	//put user by id and update nickname and profile image
	user = await Blog.User.findOne({
		where: {
			incentiveId: userIncentive.id,
		},
		attributes: ['id', 'nickname', 'profileImage'],
	});
	user.set({
		nickname: fields.otherFields.nickname,
		profileImage: dataFile.urlFile || null,
	});
	await user.save();

	if (!user) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao editar usuário!',
			data: null,
		});
	}

	return {
		statusCode: 201,
		message: 'Usuário editado com sucesso!',
		data: user,
	};
});
