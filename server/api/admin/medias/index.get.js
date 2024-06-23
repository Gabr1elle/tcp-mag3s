import { Medias } from '../../../models/Medias.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// Tags register
	const tags = await Medias.Tags.findAll({
		raw: true,
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});

	tags.forEach((tag) => {
		tag.filter = false;
	});

	tags.unshift({ id: 'not', name: 'todos', filter: true });

	// check media existis
	const medias = await Medias.Application.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});

	if (medias.length) {
		return {
			statusCode: 200,
			message: 'Mídias obtidas com sucesso!',
			data: { medias, tags },
		};
	} else {
		throw createError({
			statusCode: 406,
			data: { tags },
			message: 'Não existem mídias cadastradas!',
		});
	}
});
