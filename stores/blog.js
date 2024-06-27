export const useStoreBlog = defineStore('storeBlog', {
	state: () => {
		return {
			blog: {
				posts: [],
				post: {
					createdAtFull: '',
					id: '',
					title: '',
					subtitle: '',
					slug: '',
					content: '',
					likes: 0,
					views: 0,
					comments: [],
					image: '',
					video: '',
					likeCount: 0,
					userLiked: false,
					category: null,
				},
				data: {},
				contentHasBeenLoaded: false,
				loading: true, // Adicione o estado de loading
			},
		};
	},

	getters: {
		hasPostsBlog: (state) => state.blog.posts.length > 0,
	},

	actions: {
		// Adicione o método getPost
		async getPost(slug, useToast) {
			const toast = useToast();

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
					this.blog.loading = false;
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

			this.blog.loading = false; // Desative o estado de loading após o término do carregamento
		},

		// Adicione o método getPostsBlog
		async getPostsBlog(useToast) {
			const toast = useToast;
			this.blog.loading = true;

			try {
				const { data, error, status } = await useFetch(`/api/app/blog/posts`, {
					method: 'get',
				});

				if (status.value === 'success') {
					this.blog.posts = data.value.data;
					this.blog.loading = false;
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

			this.blog.loading = false;
		},

		// Adicione o método newComment
		async newComment(postId, content) {
			try {
				const data = await $fetch(
					`/api/app/blog/comments/${getCookie('tokenUser')}`,
					{
						method: 'post',
						body: {
							content: content,
							postId: postId,
						},
					}
				);

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		},

		// FUnção de Like
		async onLike(postId) {
			try {
				const response = await $fetch(
					`/api/app/blog/like/${getCookie('tokenUser')}`,
					{
						method: 'post',
						body: {
							postId: postId,
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
