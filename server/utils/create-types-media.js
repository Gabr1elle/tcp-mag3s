import { Medias } from './../models/Medias.model';
const config = useRuntimeConfig();
const types = config.typesMedia;

// Create Types of the media if it doesn't exist
export const createTypesMedia = async () => {
  const typesMediaData = await Medias.Types.findAll({ raw: true });

  if (!typesMediaData.length) {
		for (const type of types) {
			try {
				await Medias.Types.create({ name: type });
			} catch (err) {
				console.log(err);
			}
		}
	}
}
