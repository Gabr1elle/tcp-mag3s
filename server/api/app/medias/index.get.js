import { Medias } from '../../../models/Medias.model';

export default defineEventHandler(async (event) => {
	const mediasDB = await Medias.Application.findAll();

	// check media in database exists
	if (mediasDB.length) {
		let medias = {};

		mediasDB.forEach((media) => {
			medias[media.name] = media.value ?? '';
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
			data: null,
		});
	}
});
