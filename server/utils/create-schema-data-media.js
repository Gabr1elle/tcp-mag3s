import { Medias } from '../models/Medias.model';

// Create Medias if it doesn't exist
export const createSchemaDataMedia = async () => {
	for (const media of listSchemaDataMedia) {
		const mediaData = await Medias.Application.findOne({
			where: { name: media.name },
		});

		// Create Tags of the media if it doesn't exist
		try {
			await createTagsMedia(media.tag);
		}
		catch (err) {
			console.log(err);
		}

		if (!Boolean(mediaData)) {
			try {
				await Medias.Application.create(media);
			} catch (err) {
				console.log(err);
			}
		}
	}
};
