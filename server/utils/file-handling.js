import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import { errors as formidableErrors } from 'formidable';

export const fileHandling = async (event, hasMultipleFiles, maxFiles = 10, maxFileSize = 5 * 1024 * 1024, maxFields = 8) => {
	let cancelUploads = false;
	let mimeTypeFile = 'image'; // default
	let otherFields; //fields form data

	try {
		const { fields, files, form } = await readFiles(event, {
			// formidable options
			includeFields: true,
			multiples: hasMultipleFiles,
			maxFiles: maxFiles,
			maxFileSize: maxFileSize,
			maxFields: maxFields,
			filter: ({ originalFilename }) => { // keep only images, text and csv
				// Valid extensions for images, text and csv files
				const validExtensions = new Set(['png', 'jpg', 'jpeg', 'pdf']);

				// Extract file extension
				const fileExtension = originalFilename.split('.').pop().toLowerCase();

				// Check if the file extension is valid
				const valid = validExtensions.has(fileExtension);

				// Determine the MIME type based on the file extension
				if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
					mimeTypeFile = 'image';
				} else {
					mimeTypeFile = 'doc';
				}

				if (!valid) {
					cancelUploads = true;
				}

				return valid && !cancelUploads;
			},
		});

		const exceptions = ['thisshouldbeanarray'];
		otherFields = firstValues(form, fields, exceptions);

		if (cancelUploads) {
			throw createError({
				message: 'canceluploads',
			});
		}

		return {
			files: hasMultipleFiles ? files : files.file[0],
			otherFields,
			mimeTypeFile,
		};
	} catch (error) {
		if (error.message === 'canceluploads') {
			throw createError({
				message: `Esse arquivo não é suportado, tente outro.`,
				statusCode: 400,
			});
		}

		if (error.code === formidableErrors.maxFilesExceeded) {
			throw createError({
				message: `Não é possível enviar mais de ${maxFiles} arquivo.`,
				statusCode: 400,
			});
		}

		if (error.code === formidableErrors.smallerThanMinFileSize) {
			throw createError({
				message: `Esse arquivo não possui conteúdo, envie um arquivo válido!`,
				statusCode: 400,
			});
		}

		if (error.code === formidableErrors.noEmptyFiles) {
			throw createError({
				message: `Esse arquivo está vazio, envie um arquivo válido!`,
				statusCode: 400,
			});
		}

		if (error.code === formidableErrors.biggerThanTotalMaxFileSize) {
			throw createError({
				message: `Este arquivo é maior que ${maxFileSize / (1024 * 1024)} MB.`,
				statusCode: 400,
			});
		}

		throw createError({
			message: `Um erro foi encontrado, tente novamente mais tarde! ${error}`,
			statusCode: 500,
		});
	}
};
