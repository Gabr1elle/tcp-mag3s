import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// get all categories
	const categories = await Blog.Category.findAll({
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
