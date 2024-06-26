const config = useRuntimeConfig();

export const deleteFileInGCS = async (file, otherFolder = null) => {
	try {
		const bucket = googleCloudStorage.bucket(config.gcsBucketname);
		const fileDelete = bucket.file(
			`${config.gcsSubfolder}${otherFolder || config.gcsSubfolderEnvironment}${file}`
		);

		try {
			await fileDelete.delete();
			console.log('Arquivo excluído com sucesso');
			return true;
		} catch (error) {
			console.error(`Erro ao excluir a imagem: ${error}`);
			throw createError({
				statusCode: 500,
				message: `Erro ao excluir a imagem: ${error}`,
			});
		}
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: `Algo deu errado: ${error}`,
		});
	}
};
