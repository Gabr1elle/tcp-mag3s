import { useStoreApp } from '~/stores/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);

	// Obtendo os dados de assets do admin
	await storeApp.getContentApp(useToast);

	// Rotas que não serão redirecionadas
	if (!['/maintenance', '/admin/login', '/admin/dashboard', '/admin/cms', '/admin/blog'].includes(to.path)) {
		// Redirecionar usuário para tela de Manutenção quando habilitado
		if (storeApp.contentApp.config_maintenance_will_have_app) {
			// Salvando a URL anterior que o usuário navegou
			useCookie('urlRedirect').value = from.path;
			useCookie('urlRedirectQuery').value = from.query;
			return navigateTo({ path: '/maintenance' });
		}
	}

	// Redirecionando o usuário para rota anterior ao de manutenção
	const newPath = useCookie('urlRedirect').value;
	const newQuery = useCookie('urlRedirectQuery').value;
	if(to.path === '/maintenance' && !storeApp.contentApp.config_maintenance_will_have_app && newPath) {
		useCookie('urlRedirect').value = '';
		useCookie('urlRedirectQuery').value = '';
		return navigateTo({ path: newPath, query: newQuery });
	}

	// Caso o usuário caia direto na tela de manutenção
	if(to.path === '/maintenance' && !storeApp.contentApp.config_maintenance_will_have_app) {
		return navigateTo({ path: '/' });
	}

	return;
});
