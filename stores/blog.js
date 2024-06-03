export const useStoreBlog = defineStore('storeBlog', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			posts: [],
			post: {},
			blogHasBeenLoaded: false,
			isOpenModalDeletePost: false,
		}
	},

	getters: {
		getPostsQtd: (state) => state.posts.length,
		hasPosts: (state) => state.posts.length > 0,
	},

	actions: {
		async getPosts(useToast) {
			if (this.blogHasBeenLoaded) return;
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/admin/blog/posts', {
					method: 'get',
				});

				console.log('data:', data.value);

				if (status.value === 'success') {
					this.posts = data.value.data;
					this.contentHasBeenLoaded = true;
					console.info('Posts do Blog carregado com sucesso!');
				}

				if (status.value === 'error') {
					console.error('Erro ao carregar Posts do Blog!');
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
