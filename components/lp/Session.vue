<template >
	<div class="relative">

		<LpBgDefault :image="props.bgImage" :imageMobile="props.bgImageMobile" placeholderImage="/imgs/lp/cover_banner_2.png" placeholderImageMobile="/imgs/lp/cover_banner_mobile_2.png" :bgColor="app.layout_background_colors_hotsite" position="absolute" />
		<UContainer :style="colorText" class="py-12">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-start">
				<div :class="['order-1', orderText]">
					<h3 class="fm3 text-3xl md:text-4xl lg:text-5xl mb-5 uppercase" v-html="props.title"></h3>
					<p class="text-xl lg:text-3xl lg:leading-10 uppercase" v-html="props.description"></p>
				</div>
				<div :class="['order-0', orderImage]">
					<UCarousel :items="props.images" :ui="{ item: 'basis-full' }">
						<template #default="slide">
							<img :src="`${pathAssets}${slide.item}`"
							onerror="this.src='/imgs/lp/session_placeholder.png'" alt="">
						</template>
					</UCarousel>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['title', 'description', 'images', 'bgImage', 'bgImageMobile', 'positionText', 'positionImage']);

const orderText = computed(() => {
	if (props.positionText === 'left') {
		return `md:order-0`
	}

	if (props.positionText === 'right') {
		return `md:order-1`
	}
});

const orderImage = computed(() => {
	if (props.positionImage === 'left') {
		return `md:order-0`
	}

	if (props.positionImage === 'right') {
		return `md:order-1`
	}
});

const colorText = computed(() => {
	return `color: ${app.session_text_colors_hotsite};`;
});
</script>

<style scoped></style>
