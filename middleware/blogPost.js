import { useStoreBlog } from '~/stores/blog';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const storeBlog = useStoreBlog();

	if (to.params.slug) {
		await storeBlog.getPost( to.params.slug);
	}
	return;
});
