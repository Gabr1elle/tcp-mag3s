import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { Admin } from './Admin.model';

class User extends Model { }
User.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	incentiveId: {
		type: DataTypes.STRING,
		required: true
	},
	nickname: {
		type: DataTypes.STRING,
		required: true
	},
	profileImage: {
		type: DataTypes.STRING,
		allowNull: true
	},
}, { sequelize, modelName: 'users' });

class Post extends Model { }
Post.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		required: true
	},
	subtitle: {
		type: DataTypes.STRING,
		required: true,
		allowNull: true,
	},
	slug: {
		type: DataTypes.STRING,
		unique: true
	},
	content: {
		type: DataTypes.TEXT,
		required: true,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true
	},
	video: {
		type: DataTypes.STRING,
		allowNull: true
	},
	views: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	blogCategoryId: {
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
	createdAtFull: {
		type: DataTypes.VIRTUAL,
		get() {
			return new Date(this.getDataValue('createdAt')).toLocaleString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
		},
		set() {
			throw new Error('Do not try to set the `fullName` value!');
		},
	},
}, { sequelize, modelName: 'blog_posts' });

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
}, { sequelize, modelName: 'blog_categories' });

class Comment extends Model { }
Comment.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	content: {
		type: DataTypes.TEXT('long'),
		required: true
	},
	blogPostId: {
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
}, { sequelize, modelName: 'blog_comments' });

class Like extends Model { }
Like.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	blogPostId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: true // Permite que likes sejam feitos em comentários sem estar associados a um post
	},
	blogCommentId: {
		type: DataTypes.UUID,
		allowNull: true // Permite que likes sejam feitos em posts sem estar associados a um comentário
	},
	userId: {
		type: DataTypes.UUID,
		required: true
	}
}, { sequelize, modelName: 'blog_likes' });

// Relacionamentos
// User Admin
Admin.Users.hasMany(Post, { foreignKey: 'createdUserAdminId' });
Post.belongsTo(Admin.Users, { foreignKey: 'createdUserAdminId' });

// Users App
User.hasMany(Comment, { as: 'UserComents', foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'UserComents', foreignKey: 'userId' });

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Post, { as: 'comments' });

Post.hasMany(Like);
Like.belongsTo(Post);

Post.belongsTo(Category);
Category.hasMany(Post);

// Esses relacionamentos são para os comentários aninhados (respostas)
Comment.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Post.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'Parent', foreignKey: 'parentId' });

export class Blog {
	static User = User;
	static Post = Post;
	static Category = Category;
	static Comment = Comment;
	static Like = Like;
}

