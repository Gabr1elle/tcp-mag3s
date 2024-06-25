import { Video } from '../../../../models/Video.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const stats = {
		posts: await Video.Post.count(),
		categories: await Video.Category.count(),
		comments: await Video.Comment.count(),
		likes: await Video.Like.count(),
		views: await Video.Post.sum('views'),
	};

	return {
		statusCode: 200,
		message: 'Estatísticas obtidas com sucesso!',
		data: stats,
	};
});
