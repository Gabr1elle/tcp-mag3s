import { Medias } from './../models/Medias.model';

// Create Tags of the media if it doesn't exist
export const createTagsMedia = async (tag) => {
	const TagMediaData = await Medias.Tags.findOne({
		raw: true,
		where: { name: tag },
	});

	if (!Boolean(TagMediaData)) {
		await Medias.Tags.create({ name: tag });
	}
};
