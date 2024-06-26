import { Op } from 'sequelize';
import { Blog } from '../../../../models/Blog.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const stats = {
		posts: await Blog.Post.count(),
		categories: await Blog.Category.count(),
		comments: await Blog.Comment.count(),
		likesInPosts: await Blog.Like.count({ where: { postId: { [Op.ne]: null } } }), // likes in posts
		likesInComents: await Blog.Like.count({ where: { commentId: { [Op.ne]: null } } }), // likes in comments
		likesAll: await Blog.Like.count(), // likes in posts and comments
		views: await Blog.Post.sum('views'),
	};

	return {
		statusCode: 200,
		message: 'Estatísticas obtidas com sucesso!',
		data: stats,
	};
});
