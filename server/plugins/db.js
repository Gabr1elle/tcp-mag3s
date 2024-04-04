const config = useRuntimeConfig();
import { MediasModel } from '../models/Medias.model';

export default defineNitroPlugin(async (nitro) => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({
			alter: config.forceAlterDb,
			force: config.forceDropDb,
			logging: false,
		});
		await MediasModel.sync({ logging: false });
		await createAdmin();
		await createTypesMedia();
		await createSchemaDataMedia();
		console.log('conectado ao banco!');
	} catch (err) {
		throw new Error(`Não foi possível conectar ao banco: ${err}`);
	}
});
