import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);

	// Caso a aplicação tenha autenticação obrigatória do usuário redirecionar para a tela de Login
	if (storeApp.contentApp.config_will_have_hotsite) {
		if (!doesCookieExist('tokenUser')) {
			console.log('sem cookie de autenticação, refaça o login');
			storeIncentive.loading = true;
			return navigateTo({ path: '/login' });
		}

		storeIncentive.loading = false;
		return;
	}

	// Autenticação automática para aplicativos integrados
	if (!doesCookieExist('tokenUser')) {
		console.log('cadastrando um novo cookie de autenticação');
		const data = await storeIncentive.userLogin(false, useToast);
		if (data) {
			const cookieAuth = useCookie('tokenUser', {
				maxAge: +data.expires_in,
				sameSite: true,
				httpOnly: false,
			});
			cookieAuth.value = data.access_token;
			return;
		}

		return navigateTo({ path: '/login' });
	}

	storeIncentive.loading = false;
	return;
});
