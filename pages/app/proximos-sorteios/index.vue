<template>
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
		:textColor="app.header_colors_text_app" :isLogoDark="false" />

	<AppLayoutBgDefault />

	<div v-show="!storeIncentive.loading">
		<UContainer class="py-12" :class="hasHeader">
			<div class="max-w-[700px] m-auto">
				<!-- Banner Principal com Carousel -->
				<Carousel id="carousel-next-prizes" :autoplay="6500" :wrap-around="true" :pause-autoplay-on-hover="true">
					<Slide v-for="slide in storeIncentive.listDrawsUpcomingFull" :key="slide" class="flex flex-col">
						<AppBannersCard :linkSource="storeIncentive.NextDrawLink(slide)" :hasImageDetach="false" imageDetach=""
							:loading="storeIncentive.nextDrawLoading(true)" :title="slide.fullDate"
							:subtitle="store.descriptionAwardCurrent(slide.name)" :countdown="false" :callToAction="false"
							:hasDescription="true" :description="store.descriptionNextDrawPrize(slide.fullDateYearComplete)
		" :imageAward="slide.image" />
					</Slide>

					<template #addons>
						<Pagination />
					</template>
				</Carousel>

				<!-- Campo de pesquisa -->
				<AppOthersInputSearching inputPlaceholder="Buscar por prêmio" :hasMaskInput="null"
					@input="storeIncentive.filterListUpcomingDraws(store.searchingValue)" :inputModeOption="'search'"
					class="my-8" />

				<!-- Card mostrando os próximos sorteios -->
				<div class="grid gap-10 lg:gap-14 mt-16">
					<AppGameInfoCard v-for="card in storeIncentive.filterListUpcomingDraws(
		store.searchingValue
	)" :key="card.id" :titulo="card.name" :customBackground="false" :imagemSrc="card.image" :link="false"
						:date="card.date" />
				</div>

				<!-- Feedback de pesquisa caso não exista o sorteio -->
				<div v-if="!storeIncentive.filterListUpcomingDraws(store.searchingValue).length"
					class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center text-center animate__animated animate__fadeIn">
					<h2 class="text-white">Esse prêmio não existe!</h2>
				</div>
			</div>

			<!-- Menu Behaviour -->
			<div v-if="storeIncentive.userLoggedIn">
				<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
				<div v-if="app.config_will_have_hotsite">
					<div class="md:mt-24"></div>
					<AppLayoutMenuBehaviour />
					<div class="mt-16 md:mt-24"></div>
				</div>
			</div>
		</UContainer>
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
	middleware: ['auth-user'],
});

const bgCarouselPagination = computed(() => {
	return app.colors_carousel_pagination_background;
});

const bgCarouselPaginationActive = computed(() => {
	return app.colors_emphasis_active_and_hover;
});

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite,
	};
});

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
});
</script>

<style>
#carousel-next-prizes .carousel__pagination-button::after {
	/* Your custom styles here */
	width: 25px;
	border-radius: 15px;
	height: 6px;
	background-color: v-bind(bgCarouselPagination);
	opacity: 0.3;
}

#carousel-next-prizes .carousel__pagination-button--active::after {
	/* Your custom styles here */
	background-color: v-bind(bgCarouselPaginationActive);
	opacity: 1;
}
</style>
