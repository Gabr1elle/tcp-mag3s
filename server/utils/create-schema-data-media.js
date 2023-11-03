import { MediasModel } from '../models/Medias.model';

// Create Medias if it doesn't exist
export const createSchemaDataMedia = async () => {
	for (const media of listSchemaDataMedia) {
		const mediaData = await MediasModel.findOne({
			where: { name: media.name },
		});

		if (!Boolean(mediaData)) {
			try {
				await MediasModel.create(media);
				await createTagsMedia(media.tag);
			} catch (err) {
				console.log(err);
			}
		}
	}
};
