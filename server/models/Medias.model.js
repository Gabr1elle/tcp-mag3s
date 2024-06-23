import { DataTypes, Model, UUIDV4 } from 'sequelize';

const config = useRuntimeConfig();

export class Application extends Model { }
Application.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		required: true,
		set(payload) {
			this.setDataValue('name', payload.replace(/[ ]+/g, '_'));
		},
	},
	description: {
		type: DataTypes.TEXT,
		required: true,
		allowNull: true,
	},
	value: {
		type: DataTypes.TEXT,
		required: true,
		get() {
			const rawValue = this.getDataValue('value');
			const type = this.getDataValue('type');

			if (rawValue) {
				switch (type) {
					// Archive
					case config.typesMedia[3]:
						return rawValue.split(';');

					// Boolean
					case config.typesMedia[6]:
						return switchTextToBoolean(rawValue);

					// Json
					case config.typesMedia[7]:
						return JSON.parse(rawValue);

					// Text / Link / Color
					default:
						return rawValue;
				}
			}
		},
		set(payload) {
			if (typeof payload !== 'string') {
				this.setDataValue('value', payload.join(';'));
			} else {
				this.setDataValue('value', payload);
			}
		},
	},
	placeholder: {
		type: DataTypes.STRING,
		required: false,
		allowNull: true,
	},
	tag: {
		type: DataTypes.STRING,
		required: true,
	},
	type: {
		type: DataTypes.STRING,
		required: true,
	},
}, { sequelize, tableName: 'medias' });

export class Tags extends Model { }
Tags.init(
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
	},
	{ sequelize, tableName: 'tagsmedias' }
);

export class Types extends Model { }
Types.init(
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
	},
	{ sequelize, tableName: 'typemedias' }
);

export class Medias {
	static Application = Application;
	static Tags = Tags;
	static Types = Types;
}
