
export const useVideosStore = defineStore('videos', {
	state: () => {
		return {
			data: [],
			page: 1,
			perPage: 20,
			tags: [],
			search: {
				query: '',
				page: 1,
				perPage: 10,
				history: [],
				data: [],
				tags: [],
			},
		};
	},
	actions: {
		async fetchVideos(page = false, perPage = false) {
			const responseFolderId = await fetch('/api/admin/video/getPublicFolderId');
			const data = await responseFolderId.json();
			const folderId = data.folderId;
			const response = await fetch(`/api/admin/video/getVideosByFolder`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					folderId: folderId,
					page: page,
					perPage: perPage,
				}),
			});
			const dataVideos = await response.json();
			if (this.data && this.data.length > 0) {

				const newVideos = dataVideos.data.filter(video => !this.data.some(existingVideo => existingVideo.id === video.id));
				if (newVideos.length > 0) {
					this.data.push(...newVideos);
				}
				dataVideos.data.forEach(video => {
					if (video.tags.length > 0) {
						video.tags.forEach(tag => {
							if (!this.tags.includes(tag)) {
								this.tags = [...this.tags, tag];
							}
						});
					}
				});
			} else {
				this.data = dataVideos.data;
				dataVideos.data.forEach(video => {
					if (video.tags.length > 0) {
						video.tags.forEach(tag => {
							if (!this.tags.includes(tag)) {
								this.tags = [...this.tags, tag];
							}
						});
					}
				});
			}
		},
		setSearchContent(data) {
			if (data.page == 1) {
				this.search.data = data.data;
			} else {
				this.search.data.push(...data.data);
			}
			this.search.page = data.page;
			this.search.perPage = data.perPage;
			this.search.query = data.query;
			this.search.history.push(data.query);
		},
		clearSearch() {
			this.search.query = '';
			this.search.data = [];
			this.search.page = 1;
		}
	},
});
