import { MediasModel } from '../../../models/Medias.model';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import { TagsMediaModel } from '~/server/models/TagsMedia.model';
import fs from 'fs';
import path from 'path';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	let validArchive = false;
	let { fields, form, files } = await readFiles(event, {
		includeFields: true,
		multiples: true,
		maxFiles: 10,
		maxFilesSize: 5 * 1024 * 1024,
		maxFields: 8,
		filter: function ({ name, originalFilename, mimetype }) {
			// keep only images and pdf's
			let valid =
				mimetype && (mimetype.includes('image') || mimetype.includes('pdf'));

			if (!valid) {
				validArchive = true;
			}

			return valid;
		},
	});

	// Gets first values of fields
	const exceptions = ['thisshouldbeanarray'];
	const fieldsSingle = firstValues(form, fields, exceptions);

	const name = fieldsSingle.name;
	const id = fieldsSingle.id;
	let value = files.value || fieldsSingle.value;
	let value_list_delete = fieldsSingle.value_list_delete;
	let valueDBNotRemoveArchive;
	let tag = fieldsSingle.tag;
	const createNewTag = Boolean(+fieldsSingle.newtag);
	const type = fieldsSingle.type;

	// Type json list
	const filesJson = [];
	console.log(Object.keys(files).length > 0);
	console.log(value);
	if (type === 'json' && Object.keys(files).length > 0) {
		for (const file in files) {
			filesJson.push(files[file][0]);
		}
		files.value = filesJson;
	}

	// ⬇️ Verify empty inputs ⬇️

	// Exists Media
	const getMedia = await MediasModel.findOne({ raw: true, where: { id } });
	if (!Boolean(getMedia)) {
		throw createError({
			statusCode: 422,
			message: 'Essa mídia não existe',
		});
	}

	// Name
	if (!name) {
		throw createError({
			statusCode: 422,
			message: 'Nome da mídia é obrigatorio',
		});
	} else {
		// check name only text
		if (!hasOnlyText.test(name))
			throw createError({
				statusCode: 422,
				message:
					'Nome de mídia não pode conter números, caracteres especiais e espaços no final do nome!',
			});

		// check media existis
		const hasMedia = await MediasModel.findOne({
			raw: true,
			where: { name: name.replace(/[ ]+/g, '_') },
		});

		if (Boolean(hasMedia))
			if (hasMedia.id !== id) {
				throw createError({
					statusCode: 422,
					message: 'Este nome de mídia já existe, escolha outro!',
				});
			}
	}

	// Tag
	tag = tag.replace(/[ ]+/g, '').trim();
	const tagData = await TagsMediaModel.findAll({ where: { name: tag } });

	if (!tag) {
		throw createError({
			statusCode: 422,
			message: 'Tag da mídia é obrigatório',
		});
	}

	if (createNewTag) {
		if (!hasOnlyText.test(tag))
			throw createError({
				statusCode: 422,
				message:
					'Nome de tag não pode conter números, caracteres especiais e espaços no final do nome!',
			});

		if (tagData.length) {
			throw createError({
				statusCode: 422,
				message: 'Esse nome de Tag já existe, tente outro',
			});
		}
	}

	if (!type) {
		throw createError({
			statusCode: 422,
			message: 'Tipo da media é obrigatório',
		});
	} else {
		// change type media to archive
		if (type !== getMedia.type && type === config.typesMedia[3]) {
			await MediasModel.update(
				{
					value: '',
				},
				{ where: { id } }
			);
		}

		// change type media to boolean
		if (value && type === config.typesMedia[6]) {
			value = switchInputTextBoolean(value);
		}
	}

	// Verify type Midia correct
	if (validArchive) {
		throw createError({
			statusCode: 415,
			message: 'Mídias não suportadas! Envie apenas imagens ou pdf',
		});
	}

	if (!value && !getMedia.value) {
		throw createError({
			statusCode: 422,
			message: 'Conteúdo da mídia é obrigatório',
		});
	}

	// remove medias selected
	if (value_list_delete) {
		if (!value) {
			throw createError({
				statusCode: 422,
				message:
					'Conteúdo da mídia é obrigatório quando excluir mídias existentes!',
			});
		}
		valueDBNotRemoveArchive = getMedia.value
			.split(';')
			.filter(
				(archiveDelete) => !value_list_delete.split(';').includes(archiveDelete)
			);
		value_list_delete.split(';').forEach(async (mediaFile) => {
			// const hasMediaExists = fs.existsSync(`public/uploads/${mediaFile}`);

			// if (hasMediaExists) fs.unlinkSync(`public/uploads/${mediaFile}`);

			const bucket = googleCloudStorage.bucket(config.gcsBucketname);
			const fileUp = bucket.file(
				`${config.gcsSubfolder}${config.gcsSubfolderEnvironment}${mediaFile}`
			);

			try {
				await fileUp.delete();
				console.log('Arquivo excluído com sucesso');
			} catch (error) {
				console.error(`Erro ao excluir a imagem: ${error}`);
			}
		});

		await MediasModel.update(
			{
				value: valueDBNotRemoveArchive,
			},
			{ where: { id } }
		);
	}

	// Save media archive
	let listFiles = [];
	if (files.value) {
		if (type != 'json') {
			let valueDB = await MediasModel.findOne({
				raw: true,
				where: { id },
			});
			listFiles = valueDB.value ? valueDB.value.split(';').filter(Boolean) : [];
		}

		for (const file of files.value) {
			const extFile = file.mimetype.split('/')[1];

			const fileName = `${Date.now()}-${file.newFilename}-${
				file.mimetype.split('/')[0]
			}.${extFile}`;

			const bucket = googleCloudStorage.bucket(config.gcsBucketname);
			const fileUp = bucket.file(
				`${config.gcsSubfolder}${config.gcsSubfolderEnvironment}${fileName}`
			);

			const stream = fileUp.createWriteStream({
				metadata: {
					contentType: file.mimetype, // Tipo MIME do arquivo
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

			stream.on('finish', () => {
				console.log('Arquivo enviado com sucesso para o GCS');
			});

			listFiles.push(fileName);
		}

		// Caso as imagem sejam de uma lista
		if (type === 'json') {
			const valueMediaJson = listFiles;

			let newValue = {
				list: JSON.parse(value).list.map((element, index) => {
					return {
						one: valueMediaJson[index],
						two: element.two,
						type: 'archive',
					};
				}),
			};

			console.log(valueMediaJson);
			console.log(newValue);

			value = JSON.stringify(newValue);
		} else {
			value = listFiles;
		}
	}

	// update media
	console.log(value);
	await MediasModel.update(
		{
			name,
			value: value || getMedia.value,
			tag,
			type,
		},
		{ where: { id } }
	);

	// Create new tag
	let newTag;
	if (createNewTag) newTag = await TagsMediaModel.create({ name: tag });

	const media = await MediasModel.findOne({
		raw: false,
		where: { id },
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});

	return {
		statusCode: 200,
		message: 'Mídia atualizada com sucesso!',
		data: {
			media: {
				id: media.id,
				name: media.name,
				value: media.value,
				tag: media.tag,
				type: media.type,
			},
			newTag: newTag
				? { id: newTag.id, name: newTag.name, filter: false }
				: false,
		},
	};
});
