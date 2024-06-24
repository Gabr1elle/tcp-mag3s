export const useStoreBlog = defineStore('storeBlog', {
	state: () => {
		return {
			blog: {
				posts: [],
				post: {},
				data: {},
				contentHasBeenLoaded: false,
				loading: false, // Adicione o estado de loading
			},
		};
	},

	getters: {
		hasPostsBlog: (state) => state.blog.posts.length > 0,
	},

	actions: {
		async getPost(slug) {
			const toast = 'useToast';

			try {
				this.blog.loading = true;

				const { data, error, status } = await useFetch(
					`/api/app/blog/post/${slug}`,
					{
						method: 'get',
					}
				);

				if (status.value === 'success') {
					this.blog.post = data.value.data;
					this.blog.contentHasBeenLoaded = true;
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_getBlogPost',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getBlogPost',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			} finally {
				this.blog.loading = false; // Desative o estado de loading após o término do carregamento
			}
		},

		async getPostsBlog(useToast) {
			const toast = useToast;

			try {
				this.blog.loading = true; // Ative o estado de loading

				const { data, error, status } = await useFetch(`/api/app/blog/posts`, {
					method: 'get',
				});

				if (status.value === 'success') {
					this.blog.posts = data.value.data;
					this.blog.contentHasBeenLoaded = true;
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_getBlogPosts',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getBlogPosts',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			} finally {
				this.blog.loading = false; // Desative o estado de loading após o término do carregamento
			}
		},
		async newComment(postId, content) {
			try {
				const tokenUserIncentive = getCookie('tokenUserIncentive');

				const response = await useFetch(
					`api/app/blog/comments/${tokenUserIncentive}`,
					{
						content: content,
						postId: postId,
					},
					{
						headers: {
							method: 'POST',
							Authorization: `Bearer ${getCookie('tokenUserIncentive')}`,
						},
					}
				);

				return response.data;
			} catch (error) {
				console.error(error);
			}
		},
		async getUser() {
			try {
				const tokenUserIncentive = getCookie('tokenUserIncentive');
				
				const response = await useFetch(
					`api/app/blog/user/${tokenUserIncentive}`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${tokenUserIncentive}`,
						},
					}
				);

				return response.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
