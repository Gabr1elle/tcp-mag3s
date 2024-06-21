import { DataTypes, Model, UUIDV4 } from "sequelize";

export class Users extends Model { }
Users.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			required: true,
		},
		email: {
			type: DataTypes.STRING,
			required: true,
		},
		password: {
			type: DataTypes.STRING,
			required: true,
		},
		role: {
			type: DataTypes.STRING,
			required: true,
			allowNull: false,
		},
	},
	{ sequelize, tableName: "usersAdmin" }
);

export class Role extends Model { }
Role.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		type: {
			type: DataTypes.STRING,
			required: true,
		},
	},
	{ sequelize, tableName: "roleusers" }
);

export class Admin {
	static Users = Users;
	static Role = Role;
}
