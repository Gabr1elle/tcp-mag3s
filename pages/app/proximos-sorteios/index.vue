<template>
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
		:textColor="app.header_colors_text_app" :isLogoDark="false" />

	<AppLayoutBgDefault />

	<div v-show="!storeIncentive.loading">
		<UContainer class="py-12" :class="hasHeader">
			<div class="max-w-[700px] m-auto">
				<!-- Banner Principal com Carousel -->
				<div @mouseenter="carouselPauseAutoPlay(false)" @mouseleave="carouselPauseAutoPlay(true)">
					<UCarousel :items="storeIncentive.listDrawsUpcomingFull" :ref="carouselSetup.autoPlay ? 'carouselRef' : ''" :ui="carouselSetup.ui" indicators arrows>
						<template #default="{ item }">
							<AppBannersCard :linkSource="storeIncentive.NextDrawLink(item)" :hasImageDetach="false" imageDetach=""
								:loading="storeIncentive.nextDrawLoading(true)" :title="item.fullDate"
								:subtitle="store.descriptionAwardCurrent(item.name)" :countdown="false" :callToAction="false"
								:hasDescription="true" :description="store.descriptionNextDrawPrize(item.fullDateYearComplete)
			" :imageAward="item.image" />
						</template>

						<template #indicator="{ onClick, page, active }">
							<div :class="active ? 'bullet-active' : 'bullet-outline'" class="cursor-pointer rounded-full min-w-2 min-h-2 lg:min-w-7 lg:min-h-1.5 justify-center" @click="onClick(page)"></div>
						</template>

						<template #prev="{ onClick, disabled }">
							<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-back-ios" variant="link" size="xl" :ui="{padding: {xl: 'px-12 py-12'}}" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
						</template>

						<template #next="{ onClick, disabled }">
							<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-forward-ios" variant="link" size="xl" :ui="{padding: {xl: 'px-12 py-12'}}" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
						</template>
					</UCarousel>
				</div>

				<!-- Campo de pesquisa -->
				<AppOthersInputSearching v-if="storeIncentive.listDrawsUpcomingFull" inputPlaceholder="Buscar por prêmio"
					:hasMaskInput="null" @input="storeIncentive.filterListUpcomingDraws(store.searchingValue)"
					:inputModeOption="'search'" class="my-8" />

				<!-- Card mostrando os próximos sorteios -->
				<div class="grid gap-10 lg:gap-14 mt-16">
					<AppGameInfoCard v-for="card in storeIncentive.filterListUpcomingDraws(
		store.searchingValue
	)" :key="card.id" :titulo="card.name" :customBackground="false" :imagemSrc="card.image" :link="false"
						:date="card.date" />
				</div>

				<!-- Feedback de pesquisa caso não exista o sorteio -->
				<div v-if="!storeIncentive.filterListUpcomingDraws(store.searchingValue).length && store.searchingValue"
					class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center text-center animate__animated animate__fadeIn">
					<h2 class="text-white">Busca de prêmio não encontrada!</h2>
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

// Carrossel de prêmios
const carouselRef = ref();
const carouselSetup = reactive({
	autoPlay: true,
	timer: 3500,
	ui: {
		item: 'basis-full',
		indicators: { wrapper: 'relative bottom-0 mt-4' },
		arrows: {
			wrapper: 'absolute top-1/2 transform -translate-y-1/2 w-full',
			next: 'right-0',
			prev: 'left-0'
		},
	},
});

const carouselPauseAutoPlay = (toggle) => {
	carouselSetup.autoPlay = toggle;
};

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);

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
	}

	const initCarouselInterval = () => {
		stopCarouselInterval();
		carouselInterval = startCarouselInterval();
	}

	initCarouselInterval();
});
</script>

<style>
.bullet-outline {
	background-color: v-bind(bgCarouselPagination);
	opacity: .5;
}

.bullet-active {
	background-color: v-bind(bgCarouselPaginationActive);
}
</style>
