import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const body = await readBody(event);
	const params = getRouterParams(event, 'id');

	// Verifica se o id da categoria foi informado
	if (!params.id) {
		throw createError({
			statusCode: 406,
			message: 'Id da categoria é obrigatório!',
			data: null,
		});
	}

	// Verifica se a categoria existe
	let category = await Video.Category.findOne({
		where: {
			id: params.id,
		},
	});

	if (!category) {
		throw createError({
			statusCode: 406,
			message: 'Categoria não encontrada!',
			data: null,
		});
	}

	// Verifica se o nome da categoria foi informado
	if (!body.name) {
		throw createError({
			statusCode: 406,
			message: 'Nome da categoria é obrigatório!',
			data: null,
		});
	}

	// verificar se a categoria já existe
	category = await Video.Category.findOne({ where: { name: body.name } });

	if (category && category.id !== params.id) {
		throw createError({
			statusCode: 406,
			message: 'Categoria já existe, escolha outro nome!',
			data: null,
		});
	} else {
		// Atualiza a categoria
		category = await Video.Category.findOne(
			{ where: { id: params.id }, attributes: ['id', 'name']},
		);
		category.set({ name: body.name });
		await category.save();

		if (!category) {
			throw createError({
				statusCode: 406,
				message: 'Erro ao atualizar categoria!',
				data: null,
			});
		}
	}

	return {
		statusCode: 200,
		message: 'Categoria atualizada com sucesso!',
		data: category,
	};
});
