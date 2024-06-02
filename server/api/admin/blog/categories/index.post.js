import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const body = await readBody(event);

	// verificar se o nome da categoria foi informado
	if (!body.name) {
		throw createError({
			statusCode: 406,
			message: 'Nome da categoria é obrigatório!',
			data: null,
		});
	}

	// verificar se a categoria já existe
	let category = await Blog.Category.findOne({ where: { name: body.name } });

	if (category) {
		throw createError({
			statusCode: 406,
			message: 'Categoria já existe!',
			data: null,
		});
	} else {
		// criar categoria
		category = await Blog.Category.create({
			name: body.name,
		});

		if (!category) {
			throw createError({
				statusCode: 406,
				message: 'Erro ao criar categoria!',
				data: null,
			});
		}

	}


	return {
		statusCode: 201,
		message: 'Categoria criada com sucesso!',
		data: category,
	};
});
