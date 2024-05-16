import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	const toast = useToast();

	// Caso o usuário já esteja autenticado, redirecionar para a tela de hub
	if (storeApp.contentApp.config_will_have_hotsite) {
		if (useCookie('tokenUser').value) {
			toast.add({
				id: 'show_status_login_back_error',
				color: `green`,
				title: `Sucesso!`,
				description: `Você já fez o login.`,
				icon: `i-material-symbols-check-circle`,
				timeout: 3500,
			});

			storeIncentive.loading = false;
			return navigateTo({ path: '/app/hub' });
		}
	}

	return;
});
