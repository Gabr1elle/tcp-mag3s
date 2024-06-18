export const useStoreAdmin = defineStore('storeAdmin', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			login: {
				email: '',
				password: '',
			},
			logout: false,
			medias: [],
			filterMedias: [],
			tags: [],
			filterPerTagChoise: {
				id: 'not',
				name: 'todos',
			},
			filterPerTypeMedia: null,
			loading: false,
			isOpenModalMedia: false,
			isEditMediaModal: false,
			editMediaPosition: null,
			titleModalMedia: '',
			isOpenModalMediaDelete: false,
			chosenMediaDelete: {
				id: null,
				name: '',
			},
			listArchiveMedia: [],
			listArchiveMediaDelete: [],
			formMedia: {
				id: null,
				name: '',
				value: null,
				valueFilesMedia: null,
				valueBoolean: [
					{
						name: 'sim',
						value: 'on',
						label: 'VERDADEIRO',
					},
					{
						name: 'não',
						value: 'null',
						label: 'FALSO',
					},
				],
				tagSelected: null,
				typeMS: null,
				typeJsonMS: 'text',
				typesMedia: [
					{ name: 'texto', value: 'text' },
					{ name: 'link', value: 'link' },
					{ name: 'cor', value: 'color' },
					{ name: 'arquivo/imagem', value: 'archive' },
					{ name: 'ícone', value: 'icon' },
					{ name: 'data/hora', value: 'datetime' },
					{ name: 'verdadeiro/falso', value: 'boolean' },
					{ name: 'lista', value: 'json' },
				],
				typesMediasJson: [
					{ name: 'texto', value: 'text' },
					{ name: 'arquivo/imagem', value: 'archive' },
				],
				newTag: {
					choise: 0,
					questions: [
						{
							name: 'sim',
							value: 1,
							label: 'SIM',
						},
						{
							name: 'não',
							value: 0,
							label: 'NÃO',
						},
					],
				},
			},
			searchingMedia: null,
			blog: {
				posts: [],
				post: {},
				selectPostId: null,
				blogHasBeenLoaded: false,
				isOpenModalDeletePost: false,
			}
		};
	},

	getters: {
		typesMediaForm: (state) => state.formMedia.typesMedia,
		typesMediaJsonForm: (state) => state.formMedia.typesMediasJson,
		typesMediaJsonTextOrFile: (state) => {
			if (state.formMedia.typeJsonMS === 'text') return true;
			return false;
		},
		totalMidias: (state) => state.filteredMedias(state.searchingMedia).length,
		totalMidiasNoValue: (state) =>
			state
				.filteredMedias(state.searchingMedia)
				.filter((item) => item.value === undefined).length,
		typeMediaSelectedForm: (state) => state.formMedia.typeMS,
		newTag: (state) => state.formMedia.newTag,
		tagsMediaFormSelected: (state) => {
			return state.tags.slice(1);
		},
		completedForm: (state) => {
			return (
				(state.formMedia.name &&
					state.formMedia.typeMS &&
					(state.formMedia.value || state.formMedia.valueFilesMedia) &&
					state.formMedia.tagSelected) ||
				state.listArchiveMedia.length
			);
		},
		editMediaValueArchive: (state) => {
			return (
				state.isEditMediaModal &&
				state.formMedia.typeMS &&
				state.listArchiveMedia.length
			);
		},
		carouselListMaxMedia: (state) => {
			return state.listArchiveMedia.length > 5
				? 5
				: state.listArchiveMedia.length;
		},
		carouselEnableLoop: (state) => {
			return state.listArchiveMedia.length > 1;
		},
		filteredMedias: (state) => {
			return (payload) => {
				if (!payload) {
					return state.filterMedias;
				}

				// Filtrando por nome, conteúdo (value) ou descrição
				return state.filterMedias.filter((item) => {
					if (item.value || item.description) {
						return (
							String(item.value)
								.toLowerCase()
								.includes(payload.toLowerCase()) ||
							String(item.name).toLowerCase().includes(payload.toLowerCase()) ||
							String(item.description).toLowerCase().includes(payload.toLowerCase())
						);
					}
				});
			};
		},

		//Blog
		getPostsQtd: (state) => state.blog.posts.length,
		hasPosts: (state) => state.blog.posts.length > 0,
		titleBlogByPostId: (state) => {
			const post = state.blog.posts.find((post) => post.id === state.blog.selectPostId);
			return post ? post.title : '';
		},
	},

	actions: {
		async loggingIn(useToast) {
			const toast = useToast();
			this.loading = true;

			try {
				const data = await $fetch('/api/admin/auth/login', {
					method: 'post',
					credentials: 'include',
					body: {
						email: this.login.email,
						password: this.login.password,
					},
				});

				navigateTo({ path: '/admin/dashboard' });

				this.login.email = '';
				this.login.password = '';

				toast.add({
					id: 'show_status_login',
					color: `green`,
					title: `Parabéns`,
					description: `${data.message}`,
					icon: `i-material-symbols-person-check-outline-rounded`,
					timeout: 3500,
				});
			} catch (error) {
				toast.add({
					id: 'show_status_login_error',
					color: `red`,
					title: `Atenção! Erro ${error.data.statusCode}`,
					description: `${error.data.message}`,
					icon: `i-material-symbols-warning-outline-rounded`,
					timeout: 3500,
				});
			}

			this.loading = false;
		},

		async getContent(useToast) {
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'get',
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias = data.value.data.medias;
					this.filterMedias = data.value.data.medias;
					this.tags = data.value.data.tags;
				}

				if (status.value === 'error') {
					this.tags = error.value.data.data ? error.value.data.data.tags : null;
					toast.add({
						id: 'error_getContent',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContent',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		async postNewMedia(useToast) {
			const router = useRouter();
			const toast = useToast();
			this.loading = true;
			let formData = new FormData();

			if (this.formMedia.valueFilesMedia) {
				for (const file of this.formMedia.valueFilesMedia) {
					formData.append('value', file);
				}
			}

			// Arquivos em listas json
			if (this.formMedia.typeMS === 'json') {
				this.formMedia.value.list.forEach((element, index) => {
					if (typeof element.one === 'object') {
						for (const file of element.one) {
							formData.append(`valueJson-${index}`, file);
						}

						element.one = '';
					}
				});
			}

			const data = {
				name: this.formMedia.name,
				value: this.formMedia.value,
				tag: this.formMedia.tagSelected,
				type: this.formMedia.typeMS,
				newtag: this.formMedia.newTag.choise,
			};

			// Caso a mídia seja uma lista
			if (data.type === 'json') {
				data.value = this.isMediaListJson(data);
			}

			for (const item in data) {
				formData.append(item, data[item]);
			}

			try {
				const { data, message } = await $fetch('/api/admin/medias', {
					method: 'post',
					body: formData,
					credentials: 'include',
				});

				this.medias.push(data.media);
				this.filterMedias = this.medias;

				if (data.newTag) this.tags.push(data.newTag);

				toast.add({
					id: 'success_postNewMedia',
					title: `Tudo certo!`,
					description: `${message}`,
					color: 'green',
					icon: 'i-material-symbols-check-circle-rounded',
					timeout: 3500,
				});

				this.$resetFormMedia();
				this.filteringTheMedia(
					this.filterPerTagChoise.id,
					this.filterPerTagChoise.name,
					this.filterPerTypeMedia
				);
			} catch (error) {
				toast.add({
					id: 'error_postNewMedia',
					title: `Erro: ${error.response._data.statusCode}`,
					description: `${error.response._data.message}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 5000,
				});

				if (error.response._data.data.redirect) {
					router.push({ path: '/admin/login' });
				}
			}

			this.loading = false;
		},

		$resetFormMedia() {
			this.isOpenModalMedia = false;
			this.titleModalMedia = '';

			this.formMedia.id = null;
			this.formMedia.name = '';
			this.formMedia.value = '';
			this.listArchiveMedia = [];
			this.listArchiveMediaDelete = [];
			this.formMedia.valueFilesMedia = null;
			this.formMedia.tagSelected = null;
			this.formMedia.typeMS = null;
			this.formMedia.newTag.choise = 0;

			this.isEditMediaModal = false;
			this.editMediaPosition = null;
		},

		$resetFormMediaValue() {
			if (this.listArchiveMedia) {
				this.selectAllArchiveMediaDelete();
			} else {
				this.listArchiveMediaDelete = [];
			}

			// Caso a mídia seja uma lista para resetar
			if (this.formMedia.typeMS === 'json') {
				this.formMedia.value = { list: [] };
				this.newItemListJson();
			} else this.formMedia.value = null;

			this.listArchiveMedia = [];
		},

		$resetFormMediaValueJson() {
			this.deleteArchivesListJson();
			this.formMedia.valueFilesMedia = null;

			this.formMedia.value = { list: [] };
			this.newItemListJson();
		},

		$resetChosenMediaDelete() {
			this.isOpenModalMediaDelete = false;
			this.chosenMediaDelete.id = null;
			this.chosenMediaDelete.name = '';
		},

		openModalMediaNew() {
			this.isOpenModalMedia = true;
			this.titleModalMedia = 'Cadastre uma nova Mídia';
		},

		openModalMediaDelete(media) {
			this.isOpenModalMediaDelete = true;

			this.chosenMediaDelete.id = media.id;
			this.chosenMediaDelete.name = media.name;
		},

		async deleteChosenMedia() {
			const router = useRouter();
			const toast = useToast();
			this.loading = true;

			try {
				const { data, message } = await $fetch('/api/admin/medias', {
					method: 'delete',
					body: {
						idMedia: this.chosenMediaDelete.id,
					},
					credentials: 'include',
				});

				this.medias = data.medias;
				this.filterMedias = data.medias;

				toast.add({
					id: 'success_deleteMedia',
					title: `Tudo certo!`,
					description: `${message}`,
					color: 'green',
					icon: 'i-material-symbols-check-circle-rounded',
					timeout: 3500,
				});

				this.$resetChosenMediaDelete();
				this.filteringTheMedia(
					this.filterPerTagChoise.id,
					this.filterPerTagChoise.name,
					this.filterPerTypeMedia
				);
			} catch (error) {
				toast.add({
					id: 'error_delteMedia',
					title: `Erro: ${error.response._data.statusCode}`,
					description: `${error.response._data.message}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 5000,
				});

				if (error.response._data.data.redirect) {
					router.push({ path: '/admin/login' });
				}

				if (error.response._data.data.isDelete) {
					this.medias = error.response._data.data.medias;
					this.filterMedias = error.response._data.data.medias;

					this.$resetChosenMediaDelete();
					this.getContent();
				}
			}

			this.loading = false;
		},

		openModalMediaEdit(id) {
			const media = this.filterMedias.find((media) => media.id === id);
			this.editMediaPosition = this.filterMedias.findIndex(
				(media) => media.id == id
			);

			this.isOpenModalMedia = true;
			this.titleModalMedia = `Edite a mídia ${media.name}`;
			this.isEditMediaModal = true;

			this.formMedia.id = media.id;
			this.formMedia.name = media.name.replace(/_/g, ' ');
			this.formMedia.typeMS = media.type;
			this.formMedia.tagSelected = media.tag;

			if (this.formMedia.typeMS === 'archive') {
				this.formMedia.value = null;
				this.listArchiveMedia = media.value ? media.value : [];
			} else {
				this.formMedia.value = booleanToString(media.value);
			}

			if (this.formMedia.typeMS === 'json') {
				this.formMedia.typeJsonMS = this.formMedia.value.list[0].type;
			}
		},

		async putEditMedia(useToast) {
			const router = useRouter();
			const toast = useToast();
			this.loading = true;
			let formData = new FormData();

			// tipo de mídia no formato de arquivo
			if (this.formMedia.valueFilesMedia) {
				for (const file of this.formMedia.valueFilesMedia) {
					formData.append('value', file);
				}
			}

			// Arquivos em listas json
			if (this.formMedia.typeMS === 'json') {
				this.formMedia.value.list.forEach((element, index) => {
					if (typeof element.one === 'object') {
						for (const file of element.one) {
							formData.append(`valueJson-${index}`, file);
						}

						element.one = '';
					}
				});
			}

			const data = {
				id: this.formMedia.id,
				name: this.formMedia.name,
				value: this.formMedia.value,
				tag: this.formMedia.tagSelected,
				type: this.formMedia.typeMS,
				newtag: this.formMedia.newTag.choise,
			};

			if (this.listArchiveMediaDelete.length) {
				data.value_list_delete = this.listArchiveMediaDelete.join(';');
			}

			// Caso a mídia seja uma lista
			if (data.type === 'json') {
				data.value = this.isMediaListJson(data);
			}

			for (const item in data) {
				formData.append(item, data[item]);
			}

			try {
				const { data, message } = await $fetch('/api/admin/medias', {
					method: 'put',
					body: formData,
					credentials: 'include',
				});

				this.medias = this.medias.filter((item) => item.id !== data.media.id);

				this.medias.splice(this.editMediaPosition, 0, data.media);
				this.filterMedias = this.medias;

				if (data.newTag) this.tags.push(data.newTag);

				toast.add({
					id: 'success_putEditMedia',
					title: `Tudo certo!`,
					description: `${message}`,
					color: 'sky',
					icon: 'i-material-symbols-check-circle-rounded',
					timeout: 3500,
				});

				this.$resetFormMedia();
				this.filteringTheMedia(
					this.filterPerTagChoise.id,
					this.filterPerTagChoise.name,
					this.filterPerTypeMedia
				);
			} catch (error) {
				toast.add({
					id: 'error_putEditMedia',
					title: `Erro: ${error.response._data.statusCode}`,
					description: `${error.response._data.message}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 5000,
				});

				if (error.response._data.data.redirect) {
					router.push({ path: '/admin/login' });
				}
			}

			this.loading = false;
		},

		selectArchiveMediaDelete(archive) {
			this.listArchiveMediaDelete.push(
				this.listArchiveMedia.find((item) => item === archive)
			);
			this.listArchiveMedia = this.listArchiveMedia.filter(
				(item) => item !== archive
			);
		},

		selectAllArchiveMediaDelete() {
			this.listArchiveMedia.forEach((item) => {
				this.listArchiveMediaDelete.push(item);
			});
		},

		filteringTheMedia(id, tagChoice, type = null, typeClicked = false) {
			this.filterPerTagChoise.id = id;
			this.filterPerTagChoise.name = tagChoice;
			this.filterPerTypeMedia = type || this.filterPerTypeMedia;

			this.filterMedias = null;

			// Personalizando a Tag selecionada
			this.tags.forEach((tag) => (tag.filter = false));

			this.tags.find((tag) => {
				if (tag.id === id) {
					tag.filter = !tag.filter;
				}
			});

			// Realizando o filtro
			if (tagChoice !== 'todos') {
				this.filteringPerTag(tagChoice);

				if (this.filterPerTypeMedia) {
					this.filteringPerTypeMedia(this.filterPerTypeMedia);
				}
				return;
			}

			this.filterMedias = this.medias;

			if (!typeClicked) return (this.filterPerTypeMedia = null);

			if (this.filterPerTypeMedia) {
				this.filteringPerTypeMedia(this.filterPerTypeMedia);
			}
		},

		filteringPerTag(tag) {
			this.filterMedias = this.medias.filter((media) => media.tag == tag);
		},

		filteringPerTypeMedia(type) {
			this.filterMedias = this.filterMedias.filter(
				(media) => media.type == type
			);
		},

		// Type List Json
		isMediaListJson(data) {
			if (data.type !== 'json') return;
			return JSON.stringify(this.formMedia.value);
		},

		newItemListJson() {
			this.formMedia.value.list.push({
				one: '',
				two: '',
				type: this.formMedia.typeJsonMS,
			});
		},

		removeItemListJson(index) {
			this.deleteArchiveListJson(index);

			this.formMedia.value.list.splice(index, 1);

			if (!this.formMedia.value.list.length) {
				this.newItemListJson();
			}
		},

		deleteArchiveListJson(index) {
			const archiveDelete = this.formMedia.value.list.find(
				(_item, indexItem) => indexItem === index && _item.type === 'archive'
			);

			if (
				archiveDelete &&
				typeof archiveDelete.one === 'string' &&
				archiveDelete.one.length
			) {
				this.listArchiveMediaDelete.push(archiveDelete.one);
			}
		},

		deleteArchivesListJson() {
			this.formMedia.value.list.forEach((_item) => {
				if (
					_item.type === 'archive' &&
					typeof _item.one === 'string' &&
					_item.one.length
				) {
					this.listArchiveMediaDelete.push(_item.one);
				}
			});
		},

		// Blog
		async getPosts(useToast) {
			if (this.blog.blogHasBeenLoaded) return;
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/admin/blog/posts', {
					method: 'get',
				});

				if (status.value === 'success') {
					this.blog.posts = data.value.data;
					this.blog.contentHasBeenLoaded = true;
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

		async deletePost(postId, useToast) {
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch(`/api/admin/blog/post/${postId}`, {
					method: 'delete',
				});

				if (status.value === 'success') {
					this.blog.posts = this.blog.posts.filter((post) => post.id !== postId);
					toast.add({
						id: 'success_deletePost',
						title: `Post deletado com sucesso!`,
						description: `${data.value.message}`,
						color: 'green',
						icon: 'i-material-symbols-check-circle-rounded',
						timeout: 3500,
					});
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_deletePost',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}

				// Close Modal Delete Post and reset selectPostId
				this.blog.isOpenModalDeletePost = false;
				this.blog.selectPostId = null;
			} catch (error) {
				toast.add({
					id: 'error_deletePost',
					title: `Erro: ${error.value.data.statusCode}`,
					description: `${error.value.data.message}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		}
	},
});
