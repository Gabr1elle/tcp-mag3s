<template>
	<NuxtLink id="cardOne" :to="props.linkSource"
		class="w-full h-screen lg:h-auto relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8"
		:target="app.config_will_have_raffle && !app.config_will_have_carousel_banner_main ? '_blank' : '_self'">
		<!-- Background -->
		<div :style="background"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 h-[inherit] lg:h-[180px] bg-no-repeat bg-right md:bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="grid grid-flow-col auto-cols-auto justify-start items-center col-span-2">

			<!-- Imagem de destaque -->
			<div v-if="props.hasImageDetach" class="w-[60px] sm:w-[110px] lg:w-[90px] me-5 animate__animated animate__zoomIn">
				<img :src="imageDT" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
			</div>

			<!-- Conteúdo de texto -->
			<div v-if="props.loading" :style="textColor" class="flex flex-col h-full"
				:class="hasDescription ? 'justify-between py-6' : 'justify-center py-6 sm:py-12 md:py-14'">

				<div class="text-start">
					<!-- Título -->
					<h1
						class="fm3 text-[13px] sm:text-[18px] md:text-[22px] lg:text-[19px] uppercase animate__animated animate__fadeInDown"
						v-html="props.title" :style="textColorDetach">
					</h1>
					<!-- Subtítulo -->
					<p class="fm2 text-[10px] sm:text-[16px] md:text-lg lg:text-base leading-[.8rem] sm:leading-5 lg:leading-tight animate__animated animate__fadeInUp"
						v-html="props.subtitle">
					</p>

					<!-- Contagem Regressiva -->
					<div v-if="props.countdown" class="mt-1 text-[16px] sm:text-[28px] md:text-[34px] lg:text-[26px] font-bold">
						<h1 v-if="countDW" class="animate__animated animate__fadeIn">{{ countDW }}</h1>
					</div>
				</div>

				<!-- Call to action -->
				<div v-if="props.callToAction"
					class="fm3 flex items-center mt-4 text-[12px] sm:text-[12px] md:text-[14px] uppercase tracking-wider animate__animated animate__fadeInDown">
					<p> {{ props.callToAction }} </p>
					<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg md:text-2xl" name="i-material-symbols-arrow-forward-ios" />
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
			class="w-[115px] sm:w-[220px] md:w-[240px] lg:w-[180px] col-span-1 flex items-center justify-end animate__animated animate__tada">
			<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_01.png'" />
		</div>
		<div v-if="!props.loading" class="w-[100px] sm:w-[120px] md:w-[140px] h-full flex justify-center items-center">
			<AppOthersSpin />
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const { $countdown, $checkDatePassed } = useNuxtApp();

const props = defineProps(['linkSource', 'loading', 'title', 'subtitle', 'countdown', 'callToAction', 'hasDescription', 'description', 'imageAward', 'imageDetach', 'hasImageDetach']);

const textColorDetach = computed(() => {
	if (app.config_will_have_raffle && storeIncentive.nextDrawDateIsBefore(props.countdown)) {
		return `color: ${store.contentApp.colors_detach_one}`;
	}

	return '';
});

const textColor = computed(() => {
	return `color: ${store.contentApp.colors_text_banner_cards}`;
});

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_one}'), url('/imgs/card_sorteio_atual_mobile.png')`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});

const bgSkeleton = computed(() => {
	return `${app.loading_border_colors_one}`
});

const configSkeleton = ref({
	background: "bg-skeleton"
})

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

<style>
#cardOne .arrow {
	background-color: v-bind(colorBgButton);
}

#cardOne .bg-skeleton {
	background-color: v-bind(bgSkeleton);
}
</style>
