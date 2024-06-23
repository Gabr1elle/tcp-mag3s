<template>
	<NuxtPwaManifest />
	<div v-show="!storeIncentive.loading" class="min-h-screen flex flex-col justify-between">
		<AppLayoutBgDefault />

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<!-- Banner Full -->
		<AppBannersCarouselFull />

		<!-- Demais conteúdos -->
		<div :class="hasHeader">
			<UContainer>
				<div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-3 auto-rows-auto"
					:class="[hasRafflesSimplePurchase]">
					<!-- Banner principal -->
					<div>
						<!-- Banner Principal com Carousel -->
						<div @mouseenter="carouselPauseAutoPlay(false)" @mouseleave="carouselPauseAutoPlay(true)" v-if="
							app.config_will_have_carousel_banner_main &&
							storeIncentive.listDrawsUpcomingLimited().length > 1
						">
							<UCarousel :items="storeIncentive.listDrawsUpcomingLimited(
								Number(app.carousel_banner_main_qtd_items)
							)
								" :ref="carouselSetup.autoPlay ? 'carouselRef' : ''" :ui="carouselSetup.ui" indicators arrows>
								<template #default="{ item }">
									<AppBannersCard :linkSource="storeIncentive.NextDrawLink(item)" hasImageDetach=""
										:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading(true)"
										:title="store.titleCardNextDraw(item.date)" :subtitle="store.subtitleCardNextDraw(item.date)"
										:countdown="item.date" :callToAction="store.labelButtonCardNextDraw(item.date)"
										:hasDescription="false" :description="false" :imageAward="item.image" />
								</template>

								<template #indicator="{ onClick, page, active }">
									<div :class="active ? 'bullet-active' : 'bullet-outline'"
										class="cursor-pointer rounded-full min-w-2 min-h-2 lg:min-w-7 lg:min-h-1.5 justify-center"
										@click="onClick(page)"></div>
								</template>

								<template #prev="{ onClick, disabled }">
									<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-back-ios" variant="link"
										size="xl" :ui="{ padding: { xl: 'px-12 py-12' } }" :padded="true"
										:style="`color: ${bgCarouselPaginationActive}`" />
								</template>

								<template #next="{ onClick, disabled }">
									<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-forward-ios" variant="link"
										size="xl" :ui="{ padding: { xl: 'px-12 py-12' } }" :padded="true"
										:style="`color: ${bgCarouselPaginationActive}`" />
								</template>
							</UCarousel>
						</div>

						<!-- Banner Principal sem Carousel -->
						<AppBannersCard v-else :linkSource="storeIncentive.NextDrawLink()"
							:hasImageDetach="app.config_will_have_image_detach_banner_main" :imageDetach="app.banner_image_card_one"
							:loading="storeIncentive.nextDrawLoading()" :title="store.titleCardNextDraw()"
							:subtitle="store.subtitleCardNextDraw()" :countdown="storeIncentive.nextDrawDate"
							:callToAction="store.labelButtonCardNextDraw()" :hasDescription="false" :description="false"
							:imageAward="storeIncentive.nextDrawFull.image" />
					</div>

					<!-- Compra simplificada de pacote -->
					<CheckoutSimplePurchase v-if="app.config_will_have_raffle" :isDark="false" pathRedirect="/checkout/pagamento"
						:class="app.config_will_have_scratch_card ? 'row-span-2' : 'row-span-3'
							" />

					<!-- Banner Secundário -->
					<AppBannersCard2 v-if="app.config_will_have_scratch_card" :linkSource="store.linkCardScratchQtd"
						:hasQtdDescriptionFigure="storeIncentive.hasScratchCardQtd"
						:qtdDescriptionFigure="storeIncentive.gamification.qtdScratchCard" :title="store.titleCardScratchQtd"
						:subtitle="store.subtitleCardScratchQtd" :imageDetach="app.banner_image_card_two"
						:callToAction="store.callToActionCardScratchQtd" />

					<!-- Banner Destacado -->
					<AppBannersCard3 class="lg:order-2 row-span-1" :linkSource="app.banner_detach_link_card_description_hub"
						:linkOpenTarget="app.banner_detach_link_open_blank_hub" :imageDetach="app.banner_detach_image_card_hub"
						:positionLeftImageDetach="app.banner_detach_position_image_left_hub"
						:description="app.banner_detach_text_card_description_hub" />

					<!-- Banners Duplos -->
					<div v-if="!app.config_will_have_raffle" class="grid grid-cols-2 gap-4 md:gap-5 lg:row-span-2 lg:order-1">
						<!-- Lado Esquerdo -->
						<AppBannersCard4 :linkSource="storeIncentive.lastDrawHeldLink"
							:background="app.banner_background_card_three" :title="app.banner_text_card_title_three"
							:callToAction="app.banner_text_card_label_button_one" :loading="storeIncentive.lastDrawLoading"
							:awards="[storeIncentive.lastDrawHeldFull]" :carouselAutoPlay="0" />

						<!-- Lado Direito -->
						<AppBannersCard4 linkSource="" :background="app.banner_background_card_four"
							:title="app.banner_text_card_title_four" :callToAction="false" :loading="storeIncentive.nextDrawLoading()"
							:awards="storeIncentive.listDrawsUpcomingLimited(5)" :carouselAutoPlay="5000" />
					</div>

					<!-- Banners final -->
					<AppBannersCard5 class="lg:order-3 row-span-1" :linkSource="`${app.banner_final_link_card_hub}${app.config_will_have_hotsite
						? '/' + storeIncentive.gamification.lotteryDraws.nextDraw.id
						: ''
						}`" :imageDetach="app.banner_final_image_card_hub" :description="app.banner_final_text_description_card_hub"
						:isPositionElementsOther="app.banner_final_is_position_el_card_hub"
						:colorsBackground="app.banner_final_colors_background_card_hub" />

					<AppBannersCard5 v-if="app.config_will_have_influencer_race" class="lg:order-3 row-span-1"
						:isPositionElementsOther="app.banner_final_is_position_el_card_hub"
						:imageDetach="app.influencer_race_card_hub_image" :description="app.influencer_race_card_hub_description"
						:colorsBackground="app.influencer_race_card_hub_colors_background"
						:linkSource="app.banner_final_link_card_hub_two" />
				</div>

				<!-- Menu Behaviour -->
				<div v-if="storeIncentive.userLoggedIn">
					<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
					<div v-if="app.config_will_have_hotsite">
						<div class="md:mt-14"></div>
						<AppLayoutMenuBehaviour />
						<div class="mt-16 md:mt-24"></div>
					</div>
				</div>
			</UContainer>
		</div>

		<AppLayoutFooter v-if="!app.config_will_have_hotsite" class="lg:mt-10" :imageLogo="app.brand_image_two"
			:menu="store.footerApp.menu" />
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user', 'auth-client', 'purchase-list-packages'],
});

const hasHeader = computed(() => {
	return {
		'pt-14 lg:pt-20':
			app.config_will_have_hotsite &&
			!app.config_will_have_carousel_banner_full_main,
	};
});

const hasRafflesSimplePurchase = computed(() => {
	return {
		'lg:gap-6 grid-row': app.config_will_have_raffle,
	};
});

const bgCarouselPagination = computed(() => {
	return app.colors_carousel_pagination_background;
});

const bgCarouselPaginationActive = computed(() => {
	return app.colors_emphasis_active_and_hover;
});

// Carrossel de prêmios
const carouselRef = ref();
const carouselSetup = reactive({
	autoPlay: true,
	timer: 3500,
	ui: {
		item: 'basis-full',
		indicators: {
			wrapper: 'absolute bottom-0 -translate-y-24 lg:-translate-y-6 mt-4',
		},
		arrows: {
			wrapper: 'absolute top-1/2 transform -translate-y-1/2 w-full',
			next: 'right-0',
			prev: 'left-0',
		},
	},
});

const carouselPauseAutoPlay = (toggle) => {
	carouselSetup.autoPlay = toggle;
};

let enableArrowsCarousel = ref(true);

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);

	// Menu Habilitado
	store.selectMenuBehaviour(1, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(
		2,
		'showing',
		app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd
	);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(
		4,
		'path',
		`/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`
	);

	// Iniciando o carrossel de prêmios
	const startCarouselInterval = () => {
		return setInterval(() => {
			if (!carouselRef.value) return;

			if (carouselRef.value.page === carouselRef.value.pages) {
				return carouselRef.value.select(0);
			}

			carouselRef.value.next();
		}, carouselSetup.timer);
	};

	let carouselInterval = startCarouselInterval();

	const stopCarouselInterval = () => {
		clearInterval(carouselInterval);
	};

	const initCarouselInterval = () => {
		stopCarouselInterval();
		carouselInterval = startCarouselInterval();
	};

	initCarouselInterval();

	// Arrow Carousel
	// validar o breakpoint para exibir ou não as setas
	const handleResize = () => {
		if (window.innerWidth < 1024) {
			enableArrowsCarousel.value = false;
		} else {
			enableArrowsCarousel.value = true;
		}
	};

	handleResize();
});
</script>

<style scoped>
.bullet-outline {
	background-color: v-bind(bgCarouselPagination);
	opacity: 0.5;
}

.bullet-active {
	background-color: v-bind(bgCarouselPaginationActive);
}
</style>
