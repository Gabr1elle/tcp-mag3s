import { MediasModel } from '../../../models/Medias.model';

export default defineEventHandler(async (event) => {
	// check media existis
	const mediasDB = await MediasModel.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'tag', 'id'],
			include: ['name', 'value'],
		},
	});

	if (mediasDB.length) {
		let medias = {};

		mediasDB.forEach((media) => {
			medias[media.name] = media.value !== undefined ? media.value : '';
		});

		return {
			statusCode: 200,
			message: 'Mídias obtidas com sucesso!',
			data: medias,
		};
	} else {
		throw createError({
			statusCode: 406,
			message: 'Não existem mídias cadastradas!',
		});
	}
});
