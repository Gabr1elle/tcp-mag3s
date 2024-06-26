import { schedule } from 'node-cron';
import { Op } from 'sequelize';
import { Admin } from '../models/Admin.model';

const config = useRuntimeConfig();

export default defineNitroPlugin(async (nitro) => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({
			alter: config.forceAlterDb,
			force: config.forceDropDb,
		});
		await createAdmin();
		await createTypesMedia();
		await createSchemaDataMedia();
	} catch (err) {
		logger.error(`Não foi possível conectar ao banco de dados: ${err}`);
		throw new Error(`Não foi possível conectar ao banco: ${err}`);
	}

	schedule('0 0 0 1 * *', async () => { // Schedule the task to run every 1st day of the month at 00:00:00
		logger.info('Executando a limpeza do banco de dados de logs do sistema...');
		try {
			await Admin.SystemLog.destroy({
				where: {
					createdAt: {
						[Op.lt]: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Delete logs older than 1 month
					},
				},
			});
		} catch (err) {
			logger.error(`Erro ao limpar o banco de dados de logs: ${err}`);
		}
	});
});
