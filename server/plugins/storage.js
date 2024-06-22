import { schedule } from 'node-cron';
import fsLiteDriver from "unstorage/drivers/fs-lite";

export default defineNitroPlugin(() => {
	const storage = useStorage();
	storage.mount(
		"/cacheIncentive",
		fsLiteDriver({
			// ... options from runtime config, app config or process.env
			base: "./.tmp",
		})
	);

	// Schedule the task to run every day at 4 am
	schedule('0 0 4 * * *', async () => {
		logger.info('Executando a limpeza do diretório tmp...');
		await storage.clear('cacheIncentive');
	});
});


