import { UserModel } from './../../models/User.model';
import bcrypt from 'bcrypt';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const login = await readBody(event);

	// verify user exists
	const user = await UserModel.findOne({
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
		maxAge: new Date().getTime() + (1 * 24 * 60 * 60 * 1000),
		httpOnly: false,
		sameSite: true,
	});

	return {
		id: user.id,
		message: 'usuário logado com sucesso!',
	};
});
