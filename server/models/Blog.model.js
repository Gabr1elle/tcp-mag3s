import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { Users } from './Users.model';

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
	categoryId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: new Date(),
		get() {
			return new Date(this.getDataValue('createdAt')).toLocaleString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
		}
	},
	userAdminId: {
		type: DataTypes.UUID,
		required: true,
		allowNull: false,
	}
}, { sequelize, modelName: 'posts' });

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
}, { sequelize, modelName: 'category' });

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
}, { sequelize, modelName: 'comments' });

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
}, { sequelize, modelName: 'likes' });

// Relacionamentos
// User Admin
Users.Admin.hasMany(Post);
Post.belongsTo(Users.Admin);

// Users App
User.hasMany(Comment, { as: 'UserComents', foreignKey: 'userId'});
Comment.belongsTo(User, { as: 'UserComents', foreignKey: 'userId'});

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(Like);
Like.belongsTo(Post);

Post.belongsTo(Category);
Category.hasMany(Post);

// Esses relacionamentos são para os comentários aninhados (respostas)
Comment.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Post.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId'});
Comment.belongsTo(Comment, { as: 'Parent', foreignKey: 'parentId' });

export class Blog {
	static User = User;
	static Post = Post;
	static Category = Category;
	static Comment = Comment;
	static Like = Like;
}

