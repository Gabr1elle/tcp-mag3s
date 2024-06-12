export const useStoreBlog = defineStore('storeBlog', {
	state: () => {
		return {
			blog: {
				post: {},
				data: {}, // Armazena o post atual
				contentHasBeenLoaded: false, // Flag para indicar se o conteúdo foi carregado
			}
		}
	},

	getters: {
	},

	actions: {
		async getPost(slug) {
			const toast = 'useToast';

			try {
				const { data, error, status } = await useFetch(`/api/app/blog/post/${slug}`, {
					method: 'get',
				});

				if (status.value === 'success') {
					this.blog.post = data.value.data; // Armazena o post recebido no estado
					this.blog.contentHasBeenLoaded = true;
					console.info('Post do Blog carregado com sucesso!');
				}

				if (status.value === 'error') {
					console.error('Erro ao carregar Post do Blog!');
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
	},
});

