<template>
	<div v-show="!storeIncentive.loading" class="min-h-screen flex flex-col justify-between">
		<AppLayoutBgDefault />

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="pt-12" :class="hasHeader">

			<div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-3 auto-rows-auto"
				:class="hasRafflesSimplePurchase">

				<!-- Banner Principal -->
				<div>
					<!-- Caso seja um banner com carousel -->
					<Carousel v-if="app.config_will_have_carousel_banner_main" id="carousel-card-main"
						class="w-full flex flex-col justify-between" autoplay="6500" :wrap-around="true" snap-align="center-odd"
						:pause-autoplay-on-hover="true">
						<template #slides>
							<Slide v-for="slide in storeIncentive.listDrawsUpcomingLimited(Number(app.carousel_banner_main_qtd_items))"
								:key="slide" class="flex flex-col">
								<AppBannersCard :linkSource="storeIncentive.NextDrawLink(slide)"
									:hasImageDetach="app.config_will_have_image_detach_banner_main" :imageDetach="app.banner_image_card_one"
									:loading="storeIncentive.nextDrawLoading(true)" :title="store.titleCardNextDraw(slide.date)"
									:subtitle="store.subtitleCardNextDraw(slide.date)" :countdown="slide.date"
									:callToAction="store.labelButtonCardNextDraw(slide.date)" :hasDescription="false" :description="false"
									:imageAward="slide.image" />
							</Slide>
						</template>
						<template #addons>
							<div class="carousel__navegation hidden lg:block">
								<Navigation />
							</div>
							<Pagination />
						</template>
					</Carousel>

					<AppBannersCard v-else :linkSource="storeIncentive.NextDrawLink()"
						:hasImageDetach="app.config_will_have_image_detach_banner_main" :imageDetach="app.banner_image_card_one"
						:loading="storeIncentive.nextDrawLoading()" :title="store.titleCardNextDraw()"
						:subtitle="store.subtitleCardNextDraw()" :countdown="storeIncentive.nextDrawDate"
						:callToAction="store.labelButtonCardNextDraw()" :hasDescription="false" :description="false"
						:imageAward="storeIncentive.nextDrawFull.image" />
				</div>

				<!-- Compra simplificada de pacote -->
				<CheckoutSimplePurchase v-if="app.config_will_have_raffle" :isDark="false" pathRedirect="/checkout/pagamento"
					:class="app.config_will_have_scratch_card ? 'row-span-2' : 'row-span-3'" />

				<!-- Banner Secundário -->
				<AppBannersCard2 v-if="app.config_will_have_scratch_card" :linkSource="store.linkCardScratchQtd"
					:hasQtdDescriptionFigure="storeIncentive.hasScratchCardQtd"
					:qtdDescriptionFigure="storeIncentive.gamification.qtdScratchCard" :title="store.titleCardScratchQtd"
					:subtitle="store.subtitleCardScratchQtd" :imageDetach="app.banner_image_card_two"
					:callToAction="store.callToActionCardScratchQtd" />

				<!-- Banner Destacado -->
				<AppBannersCard3 class="lg:order-2 row-span-1" :linkSource="app.banner_detach_link_card_description_hub"
					:imageDetach="app.banner_detach_image_card_hub"
					:positionLeftImageDetach="app.banner_detach_position_image_left_hub"
					:description="app.banner_detach_text_card_description_hub" />

				<!-- Banners Duplos -->
				<div v-if="!app.config_will_have_raffle" class="grid grid-cols-2 gap-4 md:gap-5 lg:row-span-2 lg:order-1">
					<!-- Lado Esquerdo -->
					<AppBannersCard4 :linkSource="storeIncentive.lastDrawHeldLink" :background="app.banner_background_card_three"
						:title="app.banner_text_card_title_three" :callToAction="app.banner_text_card_label_button_one"
						:loading="storeIncentive.lastDrawLoading" :awards="[storeIncentive.lastDrawHeldFull]" :carouselAutoPlay="0" />

					<!-- Lado Direito -->
					<AppBannersCard4 linkSource="" :background="app.banner_background_card_four"
						:title="app.banner_text_card_title_four" :callToAction="false" :loading="storeIncentive.nextDrawLoading()"
						:awards="storeIncentive.listDrawsUpcomingLimited(5)" :carouselAutoPlay="5000" />
				</div>

				<!-- Banner final -->
				<AppBannersCard5 class="lg:order-3 row-span-1"
					:linkSource="`${app.banner_final_link_card_hub}${app.config_will_have_raffle ? '/' + storeIncentive.gamification.lotteryDraws.nextDraw.id : ''}`"
					:imageDetach="app.banner_final_image_card_hub" :description="app.banner_final_text_description_card_hub"
					:isPositionElementsOther="app.banner_final_is_position_el_card_hub" />
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
	middleware: ['auth-user', 'auth-client', 'purchase-list-packages']
});

const hasHeader = computed(() => {
	return {
		'pt-14 lg:pt-20': app.config_will_have_hotsite
	}
});

const hasRafflesSimplePurchase = computed(() => {
	return {
		'lg:gap-6 grid-row': app.config_will_have_raffle,
	}
});

const bgCarouselPagination = computed(() => {
	return app.colors_carousel_pagination_background;
});

const bgCarouselPaginationActive = computed(() => {
	return app.colors_emphasis_active_and_hover;
});

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);

	// Menu Habilitado
	store.selectMenuBehaviour(1, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style>
#carousel-card-main .carousel__navegation .carousel__prev {
	/* Your custom styles here */
	left: -10px;
	transform: translateY(-20px);
}

#carousel-card-main .carousel__navegation .carousel__next {
	/* Your custom styles here */
	right: -10px;
	transform: translateY(-20px);
}

#carousel-card-main .carousel__navegation .carousel__prev svg,
#carousel-card-main .carousel__navegation .carousel__next svg {
	/* Your custom styles here */
	color: v-bind(bgCarouselPaginationActive);
	width: 120px;
	height: 120px;
	transform: scale(1.3);
}

#carousel-card-main .carousel__pagination {
	/* Your custom styles here */
	margin: 0;
}

#carousel-card-main .carousel__pagination-button::after {
	/* Your custom styles here */
	width: 25px;
	border-radius: 15px;
	height: 6px;
	background-color: v-bind(bgCarouselPagination);
	opacity: .3;
}

#carousel-card-main .carousel__pagination-button--active::after {
	/* Your custom styles here */
	background-color: v-bind(bgCarouselPaginationActive);
	opacity: 1;
}
</style>
