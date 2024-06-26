import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { Users } from './Users.model';
import { Blog } from './Blog.model';

class Post extends Model { }
Post.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	embed: {
		type: DataTypes.TEXT,
		required: true,
	},
	title: {
		type: DataTypes.STRING,
		required: true
	},
	description: {
		type: DataTypes.TEXT,
		required: false,
		allowNull: true,
	},
	slug: {
		type: DataTypes.STRING,
		unique: true
	},
	duration: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true
	},
	views: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	categoryId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: false,
	},
	createdUserAdminId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: false,
	},
	lastUpdateUserAdminId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: true,
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	createdAtPost: {
		type: DataTypes.DATE,
		allowNull: true,
	},
}, { sequelize, modelName: 'videos' });

// Hook para criar o slug do post
Post.addHook('beforeValidate', async (post, options) => {
	if (post.title) {
		// Substitua espaços por hifens, remova caracteres especiais e converta para minúsculas
		let titleWithoutAccents = removeAccents(post.title);
		let slug = titleWithoutAccents.replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
		const originalSlug = slug;

		// Verifique se o slug já existe
		let count = 1;
		while (true) {
			const postExists = await Post.findOne({ where: { slug } });
			if (!postExists) break; // Se o slug não existe, podemos usá-lo

			// Se o slug existe, adicione um número ao final e verifique novamente
			slug = `${originalSlug}-${count++}`;
		}

		post.slug = slug;
	}
});

class Category extends Model { }
Category.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		required: true,
		allowNull: false,
	}
}, { sequelize, modelName: 'videos_category' });

class Comment extends Model { }
Comment.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	content: {
		type: DataTypes.TEXT,
		required: true
	},
	postId: {
		type: DataTypes.UUID,
		required: true
	},
	userId: {
		type: DataTypes.UUID,
		required: true
	},
	parentId: {
		type: DataTypes.UUID,
		allowNull: true
	}
}, { sequelize, modelName: 'videos_comments' });

class Like extends Model { }
Like.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	postId: {
		type: DataTypes.UUID,
		required: true
	},
	userId: {
		type: DataTypes.UUID,
		required: true
	}
}, { sequelize, modelName: 'videos_likes' });

// Relacionamentos
// User Admin
Users.Admin.hasMany(Post, { foreignKey: 'createdUserAdminIdVideos' });
Post.belongsTo(Users.Admin, { foreignKey: 'createdUserAdminIdVideos' });

// Users App
Blog.User.hasMany(Comment, { as: 'UserComentsVideos', foreignKey: 'userId' });
Comment.belongsTo(Blog.User, { as: 'UserComentsVideos', foreignKey: 'userId' });

Blog.User.hasMany(Like);
Like.belongsTo(Blog.User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(Like);
Like.belongsTo(Post);

Post.belongsTo(Category);
Category.hasMany(Post);

// Esses relacionamentos são para os comentários aninhados (resostas)
Comment.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Post.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'Parent', foreignKey: 'parentId' });

export class Video {
	static Post = Post;
	static Category = Category;
	static Comment = Comment;
	static Like = Like;
}

