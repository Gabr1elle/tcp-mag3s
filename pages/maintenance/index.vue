<template>
	<div class="h-auto py-12 md:py-24 lg:py-0 lg:h-screen flex items-center relative" :style="colorText">
		<LpBgDefault :image="bgImage" :imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile.png" :bgColor="app.layout_background_colors_hotsite"
			position="fixed" />
		<UContainer
			class="grid content-center lg:grid-cols-[minmax(600px,700px)_1fr] 2xl:lg:grid-cols-[minmax(600px,700px)_1fr] lg:px-10 h-full">

			<!-- Brand Principal -->
			<div class="flex flex-col justify-start mb-10 lg:mt-12 xl:mt-6 2xl:ps-12">
				<LpImageBrand />
				<p class="fm1 text-base sm:text-lg lg:text-2xl leading-normal animate__animated animate__fadeInUp"
					v-html="app.config_maintenance_text_description"></p>
			</div>

			<!-- Imagem de destaque (Brand secundário) -->
			<div class="m-auto animate__animated animate__zoomIn">
				<UCarousel :items="[0]" :ui="{ item: 'basis-full' }">
						<img class="md:max-w-[90%] lg:w-[150%]" :src="brandMain" onerror="this.src='/imgs/lp/landing_cover_image.png'" alt="">
				</UCarousel>
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

const { pathAssets } = useRuntimeConfig().public;

const brandMain = computed(() => {
	return `${pathAssets}${app.brand_image_session}`;
});

const colorText = computed(() => {
	return `color: ${app.banner_text_colors_hotsite};`;
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile}`;
});
</script>

<style scoped></style>
