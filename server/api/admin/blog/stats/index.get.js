import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const stats = {
		posts: await Blog.Post.count(),
		categories: await Blog.Category.count(),
		comments: await Blog.Comment.count(),
		likes: await Blog.Like.count(),
		views: await Blog.Post.sum('views'),
	};

	return {
		statusCode: 200,
		message: 'Estatísticas obtidas com sucesso!',
		data: stats,
	};
});
