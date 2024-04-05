<template>
	<div class="h-screen flex items-center relative" :style="colorText">
		<LpBgDefault :image="bgImage" :imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile.png" :bgColor="app.layout_background_colors_hotsite"
			position="absolute" />
		<UContainer
			class="grid content-center lg:grid-cols-[minmax(500px,600px)_1fr] 2xl:lg:grid-cols-[minmax(400px,500px)_1fr] lg:px-10 h-full">

			<!-- Brand Principal -->
			<div class="flex flex-col justify-start mb-10 lg:mt-12 xl:mt-6 2xl:ps-12">
				<LpImageBrand />
				<p class="fm1 text-base sm:text-lg lg:text-2xl leading-normal animate__animated animate__fadeInUp"
					v-html="app.brand_text_hotsite"></p>
			</div>

			<!--  Efeito de quebra de seção -->
			<div v-if="app.config_will_have_effect_banner_main"
				class="absolute left-0 bottom-0 h-3/6 lg:h-3/6 w-full animate__animated animate__slideInUp" :style="bgColor">
			</div>

			<!-- Influencer -->
			<UContainer v-if="app.config_will_have_effect_banner_main"
				:style="colorTextTwo" class="absolute bottom-[10%] lg:bottom-[20%] z-10">

				<div v-if="store.influencerChosen" class="absolute left-0 bottom-1/2 lg:flex items-end">
					<!-- Imagem -->
					<div class="animate__animated animate__zoomIn">
						<UAvatar :src="influencerImage" alt="Avatar" size="4xl" :ui="configInfluencer" class="" />
						<div class="absolute w-20 h-20 lg:w-36 lg:h-36 border-8 rounded-full top-0" :style="borderColor"></div>
					</div>

					<!-- Descrição -->
					<div class="fm1 ms-2 mb-4">
						<p class="animate__animated animate__fadeInDown">Influencer:</p>
						<p class="animate__animated animate__fadeInUp">#{{ influencerName }}</p>
					</div>
				</div>

			</UContainer>

			<!-- Imagem de destaque (Brand secundário) -->
			<div class="m-auto animate__animated animate__zoomIn">
				<Carousel id="carousel-next-prizes" :autoplay="0" :wrap-around="false" :pause-autoplay-on-hover="true"
					:mouse-drag="app.brand_image_session.length > 1" :touch-drag="app.brand_image_session.length > 1">
					<Slide v-for="(image, index) in app.brand_image_session" :key="index">
						<img class="md:max-w-[90%] lg:w-[150%]" :src="`${pathAssets}${image}`"
							onerror="this.src='/imgs/lp/landing_cover_image.png'" alt="">
					</Slide>
				</Carousel>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const influencerImage = computed(() => {
	if (store.influencerChosen.one) {
		return `${pathAssets}${store.influencerChosen.one}`;
	} else {
		return `/imgs/lp/influencer.jpg`;
	}
});

const influencerName = computed(() => {
	return `${store.influencerChosen.two}`;
});

const colorText = computed(() => {
	return `color: ${app.banner_text_colors_hotsite};`;
});

const colorTextTwo = computed(() => {
	return `color: ${app.session_influencer_text_colors_hotsite};`;
});

const borderColor = computed(() => {
	return `border-color: ${app.session_influencer_border_colors_hotsite}`
})

const bgColor = computed(() => {
	return `background: linear-gradient(6deg, ${app.session_influencer_effect_colors_hotsite} 50%, transparent 50%); backface-visibility: hidden;`;
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile}`;
});

const configInfluencer = ref({
	size: {
		"4xl": 'w-20 h-20 lg:w-36 lg:h-36 text-4xl'
	}
});
</script>

<style scoped></style>
