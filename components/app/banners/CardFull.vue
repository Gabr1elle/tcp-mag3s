<template>
	<div id="cardFull"
		class="w-full min-h-svh lg:min-h-min h-svh lg:h-auto relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8 lg:px-14 pb-24 lg:pb-0">
		<!-- Background -->
		<div :style="background"
			class="absolute -translate-y-[50%] top-[50%] bottom-0 right-0 left-0 h-[inherit] lg:h-[180px] bg-no-repeat bg-center md:bg-center bg-cover lg:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- gradiente top -->
		<div
			class="absolute top-0 left-0 right-0 h-[calc(100vh-80%)] lg:h-32 bg-gradient-to-b from-black to-transparent lg:rounded-3xl">
		</div>
		<!-- gradiente bottom -->
		<div
			class="absolute bottom-0 left-0 right-0 h-screen lg:h-48 bg-gradient-to-t from-black to-transparent lg:rounded-3xl">
		</div>
		<!-- gradiente left -->
		<div
			class="absolute top-0 bottom-0 left-0 right-0 h-full bg-gradient-to-r from-black to-transparent lg:rounded-3xl hidden lg:block">
		</div>

		<!-- Lado Esquerdo -->
		<div class="relative grid lg:grid-flow-col auto-cols-auto col-span-2 lg:items-center items-end">
			<!-- Imagem de destaque -->
			<div v-if="props.hasImageDetach"
				class="absolute bottom-0 mb-12 lg:mb-0 lg:relative lg:bottom-auto w-[70px] sm:w-[200px] lg:w-[90px] me-5 animate_animated animate_zoomIn">
				<img :src="imageDT" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
			</div>

			<!-- Conteúdo de texto -->
			<div v-if="props.loading" :style="textColor" class="flex lg:flex-col h-full lg:items-start items-end" :class="hasDescription
				? 'justify-between py-6'
				: 'justify-center py-6 sm:py-12 md:py-14'
				">
				<div class="text-start">
					<!-- Título -->
					<h1
						class="fm3 text-[13px] sm:text-[18px] md:text-[22px] lg:text-[19px] uppercase animate__animated animate__fadeInDown"
						v-html="props.title" :style="textColorDetach"></h1>
					<!-- Subtítulo -->
					<p class="fm2 text-[10px] sm:text-[16px] md:text-lg lg:text-base leading-[.8rem] sm:leading-5 lg:leading-tight animate__animated animate__fadeInUp"
						v-html="props.subtitle"></p>

					<!-- Contagem Regressiva -->
					<div v-if="props.countdown" class="mt-1 text-[16px] sm:text-[28px] md:text-[34px] lg:text-[26px] font-bold">
						<h1 v-if="countDW" class="animate__animated animate__fadeIn">
							{{ countDW }}
						</h1>
					</div>
					<!-- Call to action -->
					<NuxtLink v-if="props.callToAction"
						class="fm3 flex items-end text-[12px] sm:text-[12px] md:text-[14px] uppercase tracking-wider animate__animated animate__fadeInDown"
						:to="props.linkSource" :target="app.config_will_have_raffle &&
							!app.config_will_have_carousel_banner_main
							? '_blank'
							: '_self'
							">
						<p>{{ props.callToAction }}</p>
						<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg md:text-2xl"
							name="i-material-symbols-arrow-forward-ios" />
					</NuxtLink>
				</div>

				<!-- Description -->
				<div v-if="props.description">
					<p class="fm1 text-[8px] sm:text-[10px] lg:text-[12px] text-start">
						{{ props.description }}
					</p>
				</div>
			</div>

			<div v-if="!props.loading" class="space-y-2 opacity-30">
				<USkeleton class="h-2 sm:h-3 md:h-4 w-[80px] sm:w-[180px] md:w-[150px] xl:w-[200px] bg-skeleton"
					:ui="configSkeleton" />
				<USkeleton class="h-2 sm:h-3 md:h-4 w-[70%] bg-skeleton" :ui="configSkeleton" />
			</div>
		</div>

		<!-- Lado Direito -->
		<div v-if="props.loading"
			class="w-[115px] sm:w-[220px] md:w-[240px] lg:w-[180px] col-span-1 flex items-end lg:items-center animate__animated animate__fadeIn">
			<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_01.png'" />
		</div>
		<div v-if="!props.loading"
			class="w-[100px] sm:w-[120px] md:w-[140px] h-full flex justify-center items-end lg:items-center">
			<AppOthersSpin />
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const { $countdown, $checkDatePassed } = useNuxtApp();

const props = defineProps([
	'linkSource',
	'loading',
	'title',
	'subtitle',
	'countdown',
	'callToAction',
	'hasDescription',
	'description',
	'imageAward',
	'imageDetach',
	'hasImageDetach',
	'background',
]);

const textColorDetach = computed(() => {
	if (app.config_will_have_raffle && storeIncentive.nextDrawDateIsBefore(props.countdown)) {
		return `color: ${store.contentApp.colors_detach_one}`;
	}

	return '';
});

const textColor = computed(() => {
	return `color: ${store.contentApp.colors_text_banner_full_cards}`;
});

const background = computed(() => {
	return `background-image:url('${props.background}'), url('/imgs/card_sorteio_atual_mobile.png')`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});

const bgSkeleton = computed(() => {
	return `${app.loading_border_colors_one}`;
});

const configSkeleton = ref({
	background: 'bg-skeleton',
});

let countDW = ref(null);

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

onNuxtReady(() => {
	function stopInterval() {
		// Se a data atual estiver no passado, interromper a contagem regressiva
		if ($checkDatePassed(props.countdown)) {
			clearInterval(intervalCountDown);
		}
	}

	let intervalCountDown = setInterval(() => {
		countDW.value = $countdown(props.countdown);
		stopInterval();
	}, 1000);

	stopInterval();
});
</script>

<style scoped>
#cardFull .arrow {
	background-color: v-bind(colorBgButton);
}

#cardFull .bg-skeleton {
	background-color: v-bind(bgSkeleton);
}
</style>
