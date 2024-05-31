import { Users } from '../../../models/Users.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const users = await Users.Admin.findAll();

	return {
		statusCode: 200,
		message: 'Lista de usuários obtida com sucesso',
		data: users,
	};
});
