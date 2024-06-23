import { Medias } from '../../../models/Medias.model';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const { idMedia } = await readBody(event);
	let medias;
	let media;

	async function getMedias() {
		medias = await Medias.Application.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
	}

	try {
		media = await Medias.Application.findOne({
			where: { id: idMedia },
		});

		if (Boolean(media)) {
			const typeMediaArchive = media.type === config.typesMedia[3];
			const typeMediaJson = media.type === config.typesMedia[7];

			if (typeMediaArchive || typeMediaJson) {
				if (media.value) {
					let medias;

					if (typeMediaArchive) medias = media.value;
					if (typeMediaJson) {
						medias = [];
						media.value.list.forEach((item) => {
							if (item.type === 'archive') {
								medias.push(item.one);
							}
						});
					}

					if (medias) {
						medias.forEach(async (mediaFile) => {
							// Delete in Google Cloud Storage
							try {
								await deleteFileInGCS(mediaFile);
							} catch (error) {
								return error;
							}
						});
					}
				}
			}
			await media.destroy();

			await getMedias();

			return {
				statusCode: 200,
				message: 'Mídia excluída com sucesso',
				data: { medias, isDelete: false },
			};
		}
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: `Ocorreu um erro ao excluir midia`,
			data: {
				isDelete: false,
			},
		});
	}

	if (!Boolean(media)) {
		await getMedias();
		throw createError({
			statusCode: 404,
			message: `Essa mídia não existe ou já foi excluída`,
			data: { medias, isDelete: true },
		});
	}
});
