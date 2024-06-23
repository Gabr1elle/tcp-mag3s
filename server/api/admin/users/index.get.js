import { Admin } from '../../../models/Admin.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const users = await Admin.Users.findAll();

	return {
		statusCode: 200,
		message: 'Lista de usuários obtida com sucesso',
		data: users,
	};
});
