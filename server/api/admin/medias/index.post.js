import { Medias } from '../../../models/Medias.model';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// Form Data
	let fields;
	try {
		fields = await fileHandling(event, true, ['png', 'jpg', 'jpeg', 'pdf']);
	} catch (error) {
		return error;
	}

	const name = fields.otherFields.name.toLowerCase();
	let value = fields.files.value || fields.otherFields.value;
	let tag = fields.otherFields.tag.toLowerCase();
	const createNewTag = Boolean(+fields.otherFields.newtag);
	const type = fields.otherFields.type;

	// Type json list
	const filesJson = [];
	if (type === 'json' && Object.keys(fields.files).length > 0) {
		for (const file in fields.files) {
			filesJson.push({ archive: fields.files[file][0], posArr: file.split('-')[1] });
		}
		fields.files.value = filesJson;
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
		const hasMedia = await Medias.Application.findOne({
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
	const tagData = await Medias.Tags.findAll({ where: { name: tag } });

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


	// Save media archive
	let listFiles = [];
	if (fields.files.value) {
		for (const fileOrigin of fields.files.value) {
			const file = type === 'json' ? fileOrigin.archive : fileOrigin;

			// Save in Google Cloud Storage
			let dataFile;
			try {
				const urlFileSavedPromise = saveFileInGCS(file);
				dataFile = {
					fileName: urlFileSavedPromise.fileName,
					urlFile: await urlFileSavedPromise.urlFile,
				};
			} catch (error) {
				return error;
			}

			if (type === 'json') {
				listFiles.push({ archive: dataFile.fileName, posArr: fileOrigin.posArr });
			} else {
				listFiles.push(dataFile.fileName);
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
	const media = await Medias.Application.create({
		name,
		value,
		tag,
		type,
	});

	// Create new tag
	let newTag;
	if (createNewTag) newTag = await Medias.Tags.create({ name: tag });

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
