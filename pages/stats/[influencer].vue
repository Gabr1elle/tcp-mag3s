<template>
	<div class="h-auto py-12 md:py-24 lg:py-0 lg:h-screen flex items-center relative" :style="colorText">
		<LpBgDefault :image="bgImage" :imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile.png" :bgColor="app.layout_background_colors_hotsite"
			position="fixed" />
		<UContainer
			class="grid content-center lg:grid-cols-[minmax(600px,700px)_1fr] 2xl:lg:grid-cols-[minmax(600px,700px)_1fr] lg:px-10 h-full gap-5">

			<!-- Brand Principal -->
			<div class="flex flex-col justify-start mb-10 lg:mt-12 xl:mt-6 2xl:ps-12">
				<LpImageBrand />
				<p class="fm1 text-base sm:text-lg lg:text-2xl leading-normal animate__animated animate__fadeInUp"
					v-html="app.influencer_race_hotsite_stats_title"></p>

				<!-- Dados do Influencer -->
				<div>
					<div class="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
						<div v-for="(influencerMedia, index) in app.influencer_race_hotsite_stats_labels.list" :key="index"
							class="border border-dashed p-3 rounded-md lg:rounded-xl animate__animated animate__zoomInUp">
							<div class="flex flex-col">
								<div v-if="!storeIncentive.influencerRace.influencer.loading" :style="colorTextStatsNumers">
									<h1 v-if="storeIncentive.influencerRace.influencer.score" :class="['fm3', `${index === 0 ? 'text-base lg:text-lg mb-3' : 'text-2xl lg:text-5xl'}`]">
										{{ index > 0 ? storeIncentive.findInfluencerStats(influencerMedia.three) : storeIncentive.influencerRace.influencer.code }}</h1>

									<p v-else class="fm3 text-base uppercase mb-4">Este influencer não possui estatísticas!</p>
								</div>
								<div v-show="storeIncentive.influencerRace.influencer.loading"
									class="w-full h-auto flex justify-start items-center mb-4 animate__animated animate__fadeIn">
									<AppOthersSpin />
								</div>
								<h3 class="fm3 text-lg lg:text-2xl" v-html="influencerMedia.one"></h3>
								<p class="fm2 leading-tight" v-html="influencerMedia.two"></p>
							</div>
						</div>
					</div>
				</div>
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

definePageMeta({
	middleware: ['auth-client', 'chosen-influencer']
});

const brandMain = computed(() => {
	return `${pathAssets}${app.brand_image_session}`;
});

const colorText = computed(() => {
	return `color: ${app.banner_text_colors_hotsite};`;
});

const colorTextStatsNumers = computed(() => {
	return `color: ${app.influencer_race_hotsite_colors_stats_numbers};`;
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile}`;
});
</script>

<style scoped></style>
