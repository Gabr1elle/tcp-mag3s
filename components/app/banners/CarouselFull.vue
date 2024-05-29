<template>
	<div v-if="app.config_will_have_carousel_banner_full_main" :class="hasHeader">
		<UContainer :ui="{
			base: 'w-full lg:h-min lg:min-h-min mb-4 lg:mb-0',
			padding: 'px-0 sm:px-0',
		}">
			<div @mouseenter="carouselPauseAutoPlay(false)" @mouseleave="carouselPauseAutoPlay(true)">
				<UCarousel :items="storeIncentive.listDrawsUpcomingLimited(Number(app.carousel_banner_full_main_qtd_items))"
					:ref="carouselSetup.autoPlay ? 'carouselRef' : ''" :ui="carouselSetup.ui"
					:indicators="storeIncentive.nextDrawLoading()"
					:arrows="enableArrowsCarousel && storeIncentive.nextDrawLoading()">

					<template #default="{ item }">
						<AppBannersCardFull :linkSource="storeIncentive.NextDrawLink(item)" hasImageDetach="" :background="item.image"
							:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading()"
							:title="store.titleCardNextDraw(item.date)" :subtitle="store.subtitleCardNextDraw(item.date)"
							:countdown="item.date" :callToAction="store.labelButtonCardNextDraw(item.date)" :hasDescription="false"
							:description="false" :imageAward="item.image" />
					</template>

					<template #indicator="{ onClick, page, active }">
						<div :class="active ? 'bullet-active' : 'bullet-outline'"
							class="cursor-pointer rounded-full min-w-2 min-h-2 lg:min-w-7 lg:min-h-1.5 justify-center"
							@click="onClick(page)"></div>
					</template>

					<template #prev="{ onClick, disabled }">
						<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-back-ios" variant="link" size="xl"
							:ui="{ padding: { xl: 'px-12 py-12' } }" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
					</template>

					<template #next="{ onClick, disabled }">
						<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-forward-ios" variant="link" size="xl"
							:ui="{ padding: { xl: 'px-12 py-12' } }" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
					</template>
				</UCarousel>
			</div>

			<div v-if="!storeIncentive.nextDrawLoading()"
				class="w-full h-screen lg:h-full lg:min-h-52 flex justify-center items-center bg-slate-950">
				<AppOthersSpinLarge />
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

const hasHeader = computed(() => {
	return {
		'lg:pt-20':
			app.config_will_have_hotsite &&
			app.config_will_have_carousel_banner_full_main,
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
