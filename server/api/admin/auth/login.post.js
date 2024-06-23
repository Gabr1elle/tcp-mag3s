import { Admin } from '../../../models/Admin.model';
import bcrypt from 'bcrypt';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const login = await readBody(event);

	// verify user exists
	const user = await Admin.Users.findOne({
		where: { email: login.email },
	});
	if (!user) {
		throw createError({
			statusCode: 402,
			message: 'Esse usuário não existe, tente novamente!',
		});
	}

	// compare password
	const checkPassword = await bcrypt.compare(login.password, user.password);
	if (!checkPassword) {
		throw createError({
			statusCode: 402,
			message: 'Senha Inválida, tente novamente!',
		});
	}

	// save Cookie
	setCookie(event, 'idUser', user.id, {
		maxAge: 86400,
		httpOnly: false,
		sameSite: 'lax',
	});

	return {
		id: user.id,
		message: 'usuário logado com sucesso!',
	};
});
