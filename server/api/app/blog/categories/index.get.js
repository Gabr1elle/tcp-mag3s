import {Blog} from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const categories = await Blog.Category.findAll({
		attributes: ['id', 'name'],
	});

	if (!categories.length) {
		throw createError({
			statusCode: 406,
			message: 'Não existem categorias cadastradas!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Categorias obtidas com sucesso!',
		data: categories,
	};
});
