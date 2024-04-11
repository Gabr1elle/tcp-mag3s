<template>
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
		:textColor="app.header_colors_text_app" :isLogoDark="false" />

	<AppLayoutBgDefault />

	<div v-show="!storeIncentive.loading">
		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="py-12" :class="hasHeader">
			<!-- Banner Principal com Carousel -->
			<Carousel id="carousel-next-prizes" :autoplay="6500"
				:wrap-around="true" :pause-autoplay-on-hover="true">
				<Slide v-for="slide in storeIncentive.listDrawsUpcomingFull" :key="slide" class="flex flex-col">
					<AppBannersCard :linkSource="storeIncentive.NextDrawLink(slide)" :hasImageDetach="false"
						imageDetach="" :loading="storeIncentive.nextDrawLoading(true)"
						:title="slide.fullDate" :subtitle="store.descriptionAwardCurrent(slide.name)"
						:countdown="false" :callToAction="false" :hasDescription="true"
						:description="store.descriptionNextDrawPrize(slide.fullDateYearComplete)" :imageAward="slide.image" />
				</Slide>

				<template #addons>
					<Pagination />
				</template>
			</Carousel>

			<!-- Pesquisar -->
			<AppOthersInputSearching class="mt-6" :inputModeOption="'search'" />

			<AppGameInfoCard v-for="card in cards" :key="card.id" class="mt-8" :titulo="card.titulo" :subtitulo="card.subtitulo"
				:customBackground="card.hasBg" :imagemSrc="card.img" :source="card.source" :date="card.date" />

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

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user']
});

const bgCarouselPagination = computed(() => {
	return app.colors_carousel_pagination_background;
})

const bgCarouselPaginationActive = computed(() => {
	return app.colors_emphasis_active_and_hover;
})

let cards = ref([
	{ titulo: 'Camisa de jogo autografada', subtitulo: 'Você foi o sorteado!', source: '/detalhes-premios', hasBg: true, img: '/imgs/premio_02.png', date: { day: '24', month: 'Jun' } },
	{ titulo: 'Luva do cassio autografada', subtitulo: '', source: '/detalhes-premios', hasBg: false, img: '/imgs/exemplo_premio_luva.png', date: { day: '12', month: 'Fev' } },
]);

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite
	}
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
	opacity: .3;
}

#carousel-next-prizes .carousel__pagination-button--active::after {
	/* Your custom styles here */
	background-color: v-bind(bgCarouselPaginationActive);
	opacity: 1;
}
</style>
