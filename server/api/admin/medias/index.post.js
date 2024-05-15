import { MediasModel } from '../../../models/Medias.model';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import { TagsMediaModel } from '~/server/models/TagsMedia.model';
import fs from 'fs';

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
		filter: function ({ mimetype }) {
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

	const name = fieldsSingle.name.toLowerCase();
	let value = files.value || fieldsSingle.value;
	let tag = fieldsSingle.tag.toLowerCase();
	const createNewTag = Boolean(+fieldsSingle.newtag);
	const type = fieldsSingle.type;

	// Type json list
	const filesJson = [];
	if (type === 'json' && Object.keys(files).length > 0) {
		for (const file in files) {
			filesJson.push({ archive: files[file][0], posArr: file.split('-')[1] });
		}
		files.value = filesJson;
	}
	// ⬇️ Verify empty inputs ⬇️

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
			where: { name: name.replace(/[ ]+/g, '_') },
		});
		if (hasMedia)
			throw createError({
				statusCode: 422,
				message: 'Este nome de mídia já existe, escolha outro!',
			});
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

	// Type
	if (!type) {
		throw createError({
			statusCode: 422,
			message: 'Tipo da media é obrigatório',
		});
	} else {
		if (value && type === config.typesMedia[6]) {
			value = switchInputTextBoolean(value);
		}
	}

	// Value
	if (!value) {
		throw createError({
			statusCode: 422,
			message: 'Conteúdo da mídia é obrigatório',
		});
	}

	// Verify type Midia correct
	if (validArchive) {
		throw createError({
			statusCode: 415,
			message: 'Mídias não suportadas! Envie apenas imagens ou pdf',
		});
	}

	// Save media archive
	let listFiles = [];
	if (files.value) {
		for (const fileOrigin of files.value) {
			const file = type === 'json' ? fileOrigin.archive : fileOrigin;
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

			if (type === 'json') {
				listFiles.push({ archive: fileName, posArr: fileOrigin.posArr });
			} else {
				listFiles.push(fileName);
			}
		}

		// Caso as imagem sejam de uma lista
		if (type === 'json') {
			const valueMediaJson = listFiles;

			let newValue = {
				list: JSON.parse(value).list.map((element, index) => {
					let media = valueMediaJson.find((media) => +media.posArr === index);
					return {
						one: media ? media.archive : '',
						two: element.two,
						type: 'archive',
					};
				}),
			};

			value = JSON.stringify(newValue);
		} else {
			value = listFiles;
		}
	}

	// Create new media
	const media = await MediasModel.create({
		name,
		value,
		tag,
		type,
	});

	// Create new tag
	let newTag;
	if (createNewTag) newTag = await TagsMediaModel.create({ name: tag });

	return {
		statusCode: 200,
		message: 'Mídia cadastrada com sucesso!',
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
