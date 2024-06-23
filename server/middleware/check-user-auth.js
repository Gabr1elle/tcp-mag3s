import { Admin } from '../models/Admin.model';

export default defineEventHandler(async (event) => {
	const idUser = getCookie(event, 'idUser');

	if (idUser) {
		const user = await Admin.Users.findOne({
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
