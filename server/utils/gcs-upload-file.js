import fs from 'fs';

const config = useRuntimeConfig();

export const saveFileInGCS = (file) => {
	try {
		const extFile = file.originalFilename.split('.')[1];
		const fileName = `${Date.now()}-${file.newFilename}.${extFile}`;

		const bucket = googleCloudStorage.bucket(config.gcsBucketname);
		const fileUpload = bucket.file(
			`${config.gcsSubfolder}${config.gcsSubfolderEnvironment}${fileName}`
		);

		const stream = fileUpload.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		});

		stream.end(fs.readFileSync(file.filepath));

		stream.on('error', (error) => {
			console.error(`Erro ao enviar arquivo para o GCS: ${error}`);

			throw createError({
				statusCode: 500,
				message: `Erro ao enviar arquivo para o GCS: ${error}`,
			});
		});

		const urlFile = new Promise((resolve, reject) => {
			stream.on('finish', async () => {
				console.info('Arquivo enviado com sucesso para o GCS');
				try {
					const [url] = await fileUpload.getSignedUrl({
						action: 'read',
						expires: '01-01-2100', // Define a data de expiração da URL
					});
					resolve(url);
				} catch (error) {
					reject(error);
				}
			});
		});

		return {
			urlFile,
			fileName,
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: `Algo deu errado: ${error}`,
		});
	}
};
