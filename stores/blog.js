export const useStoreBlog = defineStore('storeBlog', {
	state: () => {
		return {
			blog: {
				posts: [],
				post: {},
				data: {}, // Armazena o post atual
				contentHasBeenLoaded: false, // Flag para indicar se o conteúdo foi carregado
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
				const { data, error, status } = await useFetch(
					`/api/app/blog/post/${slug}`,
					{
						method: 'get',
					}
				);

				if (status.value === 'success') {
					this.blog.post = data.value.data; // Armazena o post recebido no estado
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
			}
		},

		async getPostsBlog(useToast) {
			const toast = useToast;

			try {
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
			}
		},
	},
});
