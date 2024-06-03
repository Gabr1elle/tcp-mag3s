import { Blog } from '../../../../models/Blog.model';

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

	if (body.newCategoryId) {
		// Verifica se a nova categoria existe
		const newCategory = await Blog.Category.findOne({
			where: {
				id: body.newCategoryId,
			},
		});

		if (!newCategory) {
			throw createError({
				statusCode: 406,
				message: 'Nova categoria não encontrada!',
				data: null,
			});
		}

		// Atualiza todos os posts que estão associados à categoria antiga para referenciar a nova categoria
		await Blog.Post.update({ categoryId: body.newCategoryId }, { where: { categoryId: params.id } });
	} else {

		// verificar se a categoria está associada a algum post
		const posts = await Blog.Post.findAll({
			where: {
				categoryId: params.id,
			},
		});

		if (posts.length) {
			throw createError({
				statusCode: 406,
				message: 'Não é possível deletar uma categoria que está associada a um post!',
				data: null,
			});

		}
	}

	// Deleta a categoria
	const category = await Blog.Category.destroy({
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

	return {
		statusCode: 200,
		message: 'Categoria deletada com sucesso!',
		data: category,
	};
});
