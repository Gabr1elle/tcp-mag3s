import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// get all categories
	const categories = await Video.Category.findAll({
		order: [['name', 'ASC']],
		attributes: ['id', 'name'],
	});

	if (!categories.length) {
		throw createError({
			statusCode: 404,
			message: 'Nenhuma categoria encontrada!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Categorias encontradas com sucesso!',
		data: categories,
	};
});
