import { useStoreIncentive } from './incentive';

import { generateRandomNumber } from '../utils/helpers';

export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {},
			showDrawnNumbersToday: false,
			footerApp: {
				menu: [
					{ label: 'perguntas', link: '/faq' },
					{ label: 'termos de uso', link: '/termos' },
					{ label: 'regulamento', link: '/regulamento' },
				],
			},
			contentHasBeenLoaded: false,
			modalPrize: {
				isOpenModalPrizeResult: false,
				title: '',
				subtitle: '',
				labelButton: '',
				typeAction: '',
			},
			menuBehaviour: [
				{
					id: 1,
					icon: 'i-ic-round-home',
					name: 'Home',
					path: '/app/hub',
					badge: false,
					enable: false,
					showing: true,
					submenu: false,
				},
				{
					id: 2,
					icon: 'i-mdi-checkerboard',
					name: 'Rabiscadinha',
					path: '/app/gamification',
					badge: 0,
					enable: false,
					showing: true,
					submenu: false,
				},
				{
					id: 3,
					icon: 'i-mdi-storefront-plus',
					name: 'Comprar',
					path: '/checkout/pacotes',
					badge: false,
					enable: false,
					showing: true,
					submenu: false,
				},
				{
					id: 4,
					icon: 'i-mdi-clover',
					name: 'Sorte',
					path: '',
					badge: false,
					enable: false,
					showing: true,
					submenu: false,
				},
				{
					id: 5,
					icon: 'i-mdi-menu',
					name: false,
					path: false,
					badge: false,
					enable: false,
					showing: true,
					submenu: [
						{
							id: 1,
							icon: 'i-mdi-account-edit',
							name: 'Perfil',
							path: '/app/conta/perfil',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 2,
							icon: 'i-mdi-gift-open-outline',
							name: 'Meus Prêmios',
							path: '/app/meus-premios',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 3,
							icon: 'i-mdi-credit-card-edit-outline',
							name: 'Meu Cartão',
							path: '/app/conta/cartao',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 4,
							icon: 'i-mdi-file-lock-open-outline',
							name: 'Termos e Política',
							path: '/termos',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 5,
							icon: 'i-mdi-file-document-outline',
							name: 'Regulamento',
							path: '/regulamento',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 6,
							icon: 'i-mdi-help-box-outline',
							name: 'Perguntas',
							path: '/faq',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
						{
							id: 7,
							icon: 'i-mdi-phone-message',
							name: 'Suporte',
							path: '/contato',
							badge: false,
							enable: false,
							showing: true,
							submenu: false,
						},
					],
				},
			],
			isOpenMenuBehaviour: false,
			influencerChosen: null,
			searchingValue: '',
			loading: false,
		};
	},

	getters: {
		// Raspadinhas
		titleCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd) return state.contentApp.banner_text_card_title_two;
			return state.contentApp.banner_text_card_title_five;
		},

		subtitleCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd)
				return state.contentApp.banner_text_card_subtitle_two;
			return state.contentApp.banner_text_card_subtitle_three;
		},

		linkCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd) return '/app/gamification';
			return '';
		},

		callToActionCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd)
				return state.contentApp.banner_text_card_label_button_two;
			return false;
		},

		// Próximo Sorteio
		titleCardNextDraw: (state) => {
			return (payload) => {
				const storeIncentive = useStoreIncentive();
				const nextDrawDateIsBefore = state.contentApp.config_will_have_carousel_banner_main ? storeIncentive.nextDrawDateIsBefore(payload) : storeIncentive.nextDrawDateIsBefore();

				if (nextDrawDateIsBefore)
					return state.contentApp.banner_text_card_title_six;

				return state.contentApp.banner_text_card_title_one;
			};
		},
		subtitleCardNextDraw: (state) => {
			return (payload) => {
				const storeIncentive = useStoreIncentive();
				const nextDrawDateIsBefore = state.contentApp.config_will_have_carousel_banner_main ? storeIncentive.nextDrawDateIsBefore(payload) : storeIncentive.nextDrawDateIsBefore();

				if (nextDrawDateIsBefore)
					return state.contentApp.banner_text_card_subtitle_four;

				return state.contentApp.banner_text_card_subtitle_one;
			};
		},
		labelButtonCardNextDraw: (state) => {
			return (payload) => {
				const storeIncentive = useStoreIncentive();
				const nextDrawDateIsBefore = state.contentApp.config_will_have_carousel_banner_main ? storeIncentive.nextDrawDateIsBefore(payload) : storeIncentive.nextDrawDateIsBefore();

				if (nextDrawDateIsBefore)
					return state.contentApp.banner_text_card_label_button_three;

				return false;
			};
		},

		// Revelar Prêmio
		descriptionRevealDrawPrize: (state) => {
			const storeIncentive = useStoreIncentive();
			const revealLatestDrawDateYearFull =
				storeIncentive.revealLatestDrawDateYearFull;

			if (revealLatestDrawDateYearFull) {
				return `${state.contentApp.banner_text_card_description_two} ${revealLatestDrawDateYearFull}`;
			}

			return '';
		},

		// Meus Prêmios
		descriptionPrizes: (state) => {
			return (payload) => {
				if (payload === 'luckyNumber')
					return state.contentApp.sessions_subtitle_one;
				if (payload === 'ScratchCard')
					return state.contentApp.sessions_subtitle_two;
			};
		},
		imgTypePrizes: (state) => {
			const { pathAssets } = useRuntimeConfig().public;

			return (payload) => {
				if (payload === 'luckyNumber')
					return `${pathAssets}${state.contentApp.sessions_image_one}`;
				if (payload === 'ScratchCard')
					return `${pathAssets}${state.contentApp.sessions_image_two}`;
			};
		},

		// Faq
		faq: (state) => {
			if (!state.loading)
				return state.contentApp.faq_questions_list
					? state.contentApp.faq_questions_list
					: { list: [] };
			return { list: [] };
		},

		filteredFaq: (state) => {
			return (payload) => {
				if (!payload) {
					return state.faq.list;
				}

				return state.faq.list.filter((item) =>
					item.one.toLowerCase().includes(payload.toLowerCase())
				);
			};
		},

		// Hotsite
		influencerList: (state) => {
			if (!state.loading)
				return state.contentApp.influencer_race_hotsite_list
					? state.contentApp.influencer_race_hotsite_list
					: { list: [] };
			return { list: [] };
		},

		influencerFirst: (state) => {
			return state.influencerList.list[0];
		},

		hasHotSiteOrRaffle: (state) => {
			// mostrar algo caso a aplicação tenha hotsite e rifas ou apenas hostsite
			return (
				(state.contentApp.config_will_have_raffle && state.contentApp.config_will_have_hotsite) ||
				state.contentApp.config_will_have_hotsite
			);
		},
	},

	actions: {
		async getContentApp(useToast) {
			this.contentHasBeenLoaded = true;
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/app/medias', {
					method: 'get',
				});

				if (status.value === 'success') {
					this.contentApp = data.value.data;
					console.info('conteúdo CMS carregado');
				}

				if (status.value === 'error') {
					console.error('conteúdo CMS não carregado');
					toast.add({
						id: 'error_getContentApp',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContentApp',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		openModalPrizeResult(title, subtitle, labelButton, typeAction) {
			this.modalPrize.title = title;
			this.modalPrize.subtitle = subtitle;
			this.modalPrize.labelButton = labelButton;
			this.modalPrize.typeAction = typeAction;

			this.modalPrize.isOpenModalPrizeResult = true;
		},

		$resetModalPrizeResult() {
			this.modalPrize.typeAction = '';
			this.modalPrize.title = '';
			this.modalPrize.subtitle = '';
			this.modalPrize.labelButton = '';

			this.modalPrize.isOpenModalPrizeResult = false;
		},

		// Action Prize
		async callToActionPrize() {
			const storeIncentive = useStoreIncentive();
			const revealChosenDraw =
				storeIncentive.gamification.lotteryDraws.revealChosenDraw;
			const revealDrawnNumber = storeIncentive.revealDrawnNumber;

			const router = useRouter();
			this.modalPrize.isOpenModalPrizeResult = false;

			switch (this.modalPrize.typeAction) {
				case 'reveal':
					revealChosenDraw.showDrawnNumbersToday = true;
					await revealDrawnNumber(1000, 'awarded', 'nailed');
					console.log('chamar função que revela o prêmio');
					break;
				case 'back':
					this.$resetModalPrizeResult();
					storeIncentive.$resetRevealDrawnNumber();
					router.go(-1);
					break;
				case 'details':
					this.$resetModalPrizeResult();
					storeIncentive.$resetRevealDrawnNumber();
					router.push('/app/hub');
					break;

				default:
					console.log('o modal foi fechado apenas!');
					break;
			}
		},

		// Chosen Influencer Hotsite
		chosenInfluencer(influencer) {
			this.influencerChosen =
				this.influencerList.list.find(
					(item) => item.two === influencer
			);

			// Exibe um influencer aleatório caso o usuário não tenha informado um
			if (!influencer) {
				this.influencerChosen =
					this.influencerList.list[
						generateRandomNumber(this.influencerList.list.length - 1)
					];
			}
		},

		// Select Menu
		selectMenuBehaviour(id, propety, value, reset = false, submenu = false) {
			// Reset configs
			if (reset) {
				this.menuBehaviour.forEach((item) => {
					if (item.enable) {
						item.enable = false;
					}
				});
			}

			// Caso não tem menu para habilitar
			if (!id) return;

			// Caso seja uma configuração de submenu
			if (submenu) {
				this.menuBehaviour.find((item) => item.id === id).submenu.find((item) => item.id === submenu)[propety] = value;
				return;
			}

			this.menuBehaviour.find((item) => item.id === id)[propety] = value;
		},

		// Icon subMenu
		setIconSubMenu() {
			this.isOpenMenuBehaviour
				? this.selectMenuBehaviour(5, 'icon', 'i-mdi-window-close')
				: this.selectMenuBehaviour(5, 'icon', 'i-mdi-menu');
		},

		// Open Menu
		openMenuBehaviour(hasSubmenu) {
			if (!hasSubmenu) {
				if (this.isOpenMenuBehaviour) {
					this.isOpenMenuBehaviour = false;
					this.setIconSubMenu();
				}
				return;
			}

			this.isOpenMenuBehaviour = !this.isOpenMenuBehaviour;
			this.setIconSubMenu();
		},
	},
});
