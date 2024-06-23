import { createHash } from 'crypto';

const config = useRuntimeConfig();
const storage = useStorage('cacheIncentive');

// Função para gerar um hash do token
function generateCacheKey(key) {
	return `cacheIncentive:userIncentive-${createHash('sha256').update(key).digest('hex')}`;
}

export const getUserIncentive = async (event) => {
	let params = getRouterParams(event, 'incentiveTokenUser');

	// if incentiveTokenUser is not in params, try to get from query
	if (!params.incentiveTokenUser) {
		const query = getQuery(event);
		params.incentiveTokenUser = query.incentiveTokenUser;
	}

	//verify token empty
	if (!params.incentiveTokenUser) {
		throw createError({
			statusCode: 406,
			message: 'Token de incentivo é obrigatório!',
			data: null,
		});
	}

	// try to get user from cache in storage
	const cacheKey = generateCacheKey(params.incentiveTokenUser);
	const cachedData = await storage.getItem(cacheKey);
	const now = new Date().getTime();

	// if user is in cache and cache is not expired, return user from cache
	if (cachedData && now - cachedData.timestamp < 1800000) { // 1800000ms = 30 minutes
		return cachedData.userIncentive;
	} else {
		await storage.removeItem(cacheKey);
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

		// save user in cache with timestamp to validate cache
		await storage.setItem(cacheKey, { userIncentive, timestamp: new Date().getTime() })
	} catch (error) {

		// If error, remove cache
		await storage.removeItem(cacheKey);

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
