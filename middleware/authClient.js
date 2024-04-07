import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	// Processar o token do clientAPI apenas no lado do cliente
	if (process.server) return;

	const cookieAuth = useCookie('tokenClient');
	const app = useNuxtApp();
	const storeIncentive = useStoreIncentive(app.$pinia);

	if (!cookieAuth.value) {
		const data = await storeIncentive.clientLogin(useToast);
		let cookie = useCookie('tokenClient', {
			maxAge: +data.expires_in,
			sameSite: 'lax',
			httpOnly: false,
		});
		cookie.value = data.access_token;
		return;
	}

	return;
});
