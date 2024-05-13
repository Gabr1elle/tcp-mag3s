<template>
	<div class="relative" :style="backgroundColor">
		<UContainer :style="colorText" class="py-12">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

				<!-- Primeiro Influencer do Ranking -->
				<div
					class="w-full h-[50vh] lg:h-[70vh] bg-contain bg-center bg-no-repeat flex flex-col justify-center items-center pt-12"
					:style="backgroundInfluencer">
					<!-- Imagem -->
					<div class="animate__animated animate__zoomIn w-36 h-36 lg:w-48 lg:h-48">
						<UAvatar :src="imageInfluencerFirstRanking" alt="Avatar" size="4xl" />
						<div class="absolute w-36 h-36 lg:w-48 lg:h-48 border-8 rounded-full top-0" :style="borderColor"></div>
					</div>

					<!-- Infos -->
					<div class="text-center mt-2">
						<h3 class="fm3 uppercase">1&ordm; Lugar</h3>
						<p class="fm1" v-html="`#${store.influencerFirst.two}`"></p>
						<p class="fm3" v-html="`750pt`"></p>
					</div>
				</div>

				<!-- Lista com os melhores colocados do Ranking -->
				<div class="sm:w-[70%] md:w-[90%] lg:w-full m-auto lg:m-0">
					<!-- Título e subtítulo -->
					<div class="text-center lg:text-start">
						<h3 class="fm3 text-xl md:text-3xl mb-5 uppercase" v-html="app.session_text_title_hotsite_three"></h3>
						<p class="fm1 text-base lg:text-xl" v-html="app.session_text_description_hotsite_three"></p>
					</div>

					<!-- Lista dos influencers -->
					<h4 class="fm3 mt-12 mb-5 uppercase text-md lg:text-xl">Ranking</h4>
					<div v-for="(influencer, index) in store.influencerList.list.slice(1, 6)" :key="index"
						class="grid grid-cols-[20px_56px_1fr_1fr] gap-2 items-center"
						:class="index + 1 < store.influencerList.list.length ? 'mb-4' : ''">

						<!-- Posição -->
						<span class="fm3 text-md lg:text-xl">{{ index + 2 }}&ordm;</span>

						<!-- Imagem -->
						<div class="animate__animated animate__zoomIn w-14 h-14">
							<UAvatar :src="imageInfluencersList(influencer.one)" alt="Avatar" size="xl" />
							<div class="absolute border-4 rounded-full top-0 w-14 h-14" :style="borderColor"></div>
						</div>


						<!-- hashtag do influencer -->
						<p class="fm1 text-start" v-html="`#${influencer.two}`"></p>

						<!-- Pontuação -->
						<p class="fm3 text-end">720pts</p>
					</div>
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

const props = defineProps(['backgroundColor', 'isDark'])

const colorText = computed(() => {
	return `color: ${props.isDark ? app.session_colors_text_one : 'white'};`;
});

const borderColor = computed(() => {
	return `border-color: ${app.colors_border_two}`
});

const backgroundColor = computed(() => {
	return `background-color: ${props.backgroundColor}`;
});

const backgroundInfluencer = computed(() => {
	return `background-image: url('${app.session_background_influencer_race_hotsite}'), url('/imgs/lp/bg_ranking_influencers.png');`;
});

const imageInfluencerFirstRanking = computed(() => {
	return store.influencerFirst.one ? `${pathAssets}${store.influencerFirst.one}` : '/imgs/lp/influencer.jpg';
});

const imageInfluencersList = (image) => {
	return image ? `${pathAssets}${image}` : '/imgs/lp/influencer.jpg';
};
</script>

<style scoped></style>
