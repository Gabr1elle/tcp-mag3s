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
		throw new Error(`Não foi possível conectar ao banco: ${err}`);
	}
});
