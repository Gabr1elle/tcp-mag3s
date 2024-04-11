export default defineNuxtRouteMiddleware((to, from) => {
	const cookieAuth = useCookie('idUser');

	if (!cookieAuth.value) {
		return navigateTo({ path: '/admin/login' });
	}
});
