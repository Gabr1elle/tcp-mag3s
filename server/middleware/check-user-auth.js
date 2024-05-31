import { Users } from '../models/Users.model';

export default defineEventHandler(async (event) => {
	const idUser = getCookie(event, 'idUser');

	if (idUser) {
		const user = await Users.Admin.findOne({
			raw: true,
			where: { id: idUser },
		});

		if (user) {
			event.context.auth = {
				id: user.id,
				role: user.role,
			};
		}
	}
});
