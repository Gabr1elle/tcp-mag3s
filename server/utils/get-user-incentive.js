const config = useRuntimeConfig();

export const getUserIncentive = async (event) => {
	const params = getRouterParams(event, 'incentiveTokenUser');

	//verify token empty
	if (!params.incentiveTokenUser) {
		throw createError({
			statusCode: 406,
			message: 'Token de incentivo é obrigatório!',
			data: null,
		});
	}

	let userIncentive = {};
	try {
		const response = await $fetch(`${config.public.ApiIncentiveSystemIdentity}account/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${params.incentiveTokenUser}`,
			},
		});

		userIncentive.id = response.id;
		userIncentive.email = response.email;
	} catch (error) {
		throw createError({
			statusCode: 406,
			message: `Erro ao buscar usuário no sistema de incentivo! ${error}`,
			data: null,
		});
	}

	if (!userIncentive.id || !userIncentive.email) {
		throw createError({
			statusCode: 406,
			message: 'Usuário não encontrado no sistema de incentivo!',
			data: null,
		});
	}

	return userIncentive;
}
