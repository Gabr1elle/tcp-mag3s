import { Users } from '../../../models/Users.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const body = await readBody(event);

	// Verify user master
	if (!(await checkUserMaster(event))) {
		throw createError({
			statusCode: 403,
			message:
				'Sem permissão para registrar usuários, contate um administrador!',
		});
	}

	// verify user exists
	const checkUserExists = await Users.Admin.findOne({
		where: { email: body.email },
	});
	if (checkUserExists) {
		throw createError({
			statusCode: 402,
			message: 'Esse usuário já existe, tente outro e-mail!',
		});
	}

	// Create new user
	const user = await Users.Admin.create({
		name: body.name,
		email: body.email,
		password: await genPassHash(body.password).then((hash) => hash),
		role: body.role,
	});

	return {
		id: user.id,
		statusCode: 200,
		message: 'usuário registrado com sucesso!',
	};
});
