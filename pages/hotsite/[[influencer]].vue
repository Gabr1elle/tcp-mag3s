<template>
	<div>
		<!-- Header -->
		<LpHeader v-if="app.config_will_have_header_hotsite" />

		<!-- Banner -->
		<LpBanner />

		<!-- Steps Register -->
		<LpStepsRegister />

		<!-- Sesstions -->
		<LpSession v-if="app.config_will_have_scratch_card" :title="app.session_text_title_hotsite_one"
			:description="app.session_text_description_hotsite_one" :images="app.session_image_hotsite_one"
			:bgImage="bgImageSessionOne" :bgImageMobile="bgMobileImageSessionOne" positionText="left" positionImage="right" />

		<LpSession :title="app.session_text_title_hotsite_two" :description="app.session_text_description_hotsite_two"
			:images="app.session_image_hotsite_two" :bgImage="bgImageSessionTwo" :bgImageMobile="bgMobileImageSessionTwo"
			positionText="right" positionImage="left" />

		<LpSession v-if="app.config_will_have_streaming_of_video" :title="app.session_text_title_hotsite_four"
			:description="app.session_text_description_hotsite_four" :images="app.session_image_hotsite_three"
			:bgImage="bgImageSessionThree" :bgImageMobile="bgMobileImageSessionThree" positionText="left"
			positionImage="right" />

		<!-- Influencers Ranking -->
		<LpInfluencerRace v-if="app.config_will_have_influencer_race" :isDark="true"
			:backgroundColor="app.session_background_colors_hotsite_one" />

		<!-- Footer -->
		<LpFooter />

		<!-- Call to action -->
		<LpCallToAction />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['chosen-influencer']
});

// Seção 1
const bgMobileImageSessionOne = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile_two}`;
});

const bgImageSessionOne = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_two}`;
});

// Seção 2
const bgMobileImageSessionTwo = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile_two}`;
});

const bgImageSessionTwo = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_two}`;
});

// Seção 3
const bgMobileImageSessionThree = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile_two}`;
});

const bgImageSessionThree = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_two}`;
});
</script>

<style scoped></style>
