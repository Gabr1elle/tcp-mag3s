import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	const toast = useToast();

	// Caso a aplicação tenha autenticação obrigatória do usuário redirecionar para a tela de Login
	if (storeApp.contentApp.config_will_have_hotsite) {
		if (!useCookie('tokenUser').value) {
			console.log('sem cookie de autenticação, refaça o login.');
			toast.add({
				id: 'show_status_login_access_error',
				color: `red`,
				title: `Atenção!`,
				description: `Autenticação expirada, refaça o login.`,
				icon: `i-material-symbols-warning-outline-rounded`,
				timeout: 3500,
			});

			storeIncentive.loading = true;
			return navigateTo({ path: '/login' });
		}

		// Obtendo os dados do usuário
		await storeIncentive.userAccount(useToast);

		storeIncentive.loading = false;
		return;
	}

	// Autenticação automática para aplicativos integrados
	if (!useCookie('tokenUser').value) {
		console.log('cadastrando um novo cookie de autenticação');
		const data = await storeIncentive.userLogin(useToast, false);
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
