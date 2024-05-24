<template>
	<NuxtLink :to="props.linkSource" class="w-full relative p-3 sm:p-6 md:p-6 min-h-[210px] sm:h-[250px] md:h-[280px] ">
		<!-- Background -->
		<div :style="background"
			class="absolute top-0 bottom-0 right-0 left-0 bg-no-repeat bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Conteúdo -->
		<div :style="`color: ${store.contentApp.colors_text_one}`" class="flex flex-col h-full justify-between items-center">

			<!-- Título -->
			<h1
				class="fm3 text-[12px] sm:text-[18px] md:text-[20px] lg:text-[14px] uppercase animate__animated animate__fadeInDown">
				{{ props.title }}
			</h1>

			<!-- items -->
			<div v-if="props.loading" @mouseenter="carouselPauseAutoPlay(false)" @mouseleave="carouselPauseAutoPlay(true)">
				<UCarousel :items="props.awards" :ref="carouselSetup.autoPlay ? 'carouselRef' : ''" :ui="carouselSetup.ui" :indicators="props.awards.length > 1" draggable>
					<template #default="{ item }">
						<div class="flex flex-col justify-center items-center w-full">
							<!-- Image -->
							<div v-if="props.loading" class="w-[100px] sm:w-[120px] md:w-[140px] animate__animated animate__tada">
								<img :src="item.image" onerror="this.src='/imgs/premio_02.png'" />
							</div>

							<!-- Data -->
							<div v-if="props.awards.length >= 1 && !props.callToAction" class="fm3 mt-1 text-[12px] sm:text-[16px]">
								<h1 class="animate__animated animate__fadeIn">{{
									$formatDayMonthYear(item.date) }}</h1>
							</div>
						</div>
					</template>

					<template #indicator="{ onClick, page, active }">
						<div :class="active ? 'bullet-active' : 'bullet-outline'" class="cursor-pointer rounded-full min-w-2 min-h-2 lg:min-w-3 lg:min-h-3 justify-center" @click="onClick(page)"></div>
					</template>
				</UCarousel>
			</div>

			<div v-else class="h-full flex items-center">
				<AppOthersSpin />
			</div>

			<!-- Call to action -->
			<div v-if="props.callToAction"
				class="fm3 w-full flex items-center justify-end mt-4 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-wider">
				<p> {{ props.callToAction }} </p>
				<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg" name="i-material-symbols-arrow-forward-ios" />
			</div>

		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'background', 'title', 'callToAction', 'loading', 'awards', 'carouselAutoPlay']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${props.background}'), url('/imgs/card_sorteio_futuro_mobile.png')`;
});

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

const bgCarouselPagination = computed(() => {
	return store.contentApp.colors_carousel_pagination_background;
});

const bgCarouselPaginationActive = computed(() => {
	return store.contentApp.colors_emphasis_active_and_hover;
});

// Carrossel de prêmios
const carouselRef = ref();
const carouselSetup = reactive({
	autoPlay: true,
	timer: props.carouselAutoPlay,
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

<style scoped>
.arrow {
	background-color: v-bind(colorBgButton);
}

.bullet-outline {
	background-color: v-bind(bgCarouselPagination);
	opacity: .5;
}

.bullet-active {
	background-color: v-bind(bgCarouselPaginationActive);
}
</style>
