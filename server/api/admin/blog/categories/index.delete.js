import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (!body.id) {
		throw createError({
			statusCode: 406,
			message: 'Id da categoria é obrigatório!',
			data: null,
		});
	}

	if (body.newCategoryId) {
		// Atualiza todos os posts que estão associados à categoria antiga para referenciar a nova categoria
		await Blog.Post.update({ categoryId: body.newCategoryId }, { where: { categoryId: body.id } });
	} else {

		// verificar se a categoria está associada a algum post
		const posts = await Blog.Post.findAll({
			where: {
				categoryId: body.id,
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

	const category = await Blog.Category.destroy({
		where: {
			id: body.id,
		},
	});

	if (!category) {
		throw createError({
			statusCode: 406,
			message: 'Erro ao deletar categoria!',
			data: null,
		});
	}

	return {
		statusCode: 200,
		message: 'Categoria deletada com sucesso!',
		data: category,
	};
});
