import { Sequelize } from "sequelize";

const config = useRuntimeConfig();

const configDB = {
	port: config.portDb ? config.portDb : '',
	name: config.nameDb,
	user: config.userDb,
	pass: config.passDb,
};

export const sequelize = new Sequelize(configDB.name, configDB.user, configDB.pass, {
  host: "localhost",
  dialect: "mysql",
  port: configDB.port,
	logging: false,
});
