<template>
	<NuxtLink :to="props.linkSource" :target="props.isPositionElementsOther ? '_self' : '_blank'"
		class="w-full relative grid justify-between" :class="props.isPositionElementsOther ? 'px-1 sm:px-2 md:px-4 grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[135px_1fr]' : 'px-2 sm:px-4 md:px-6 grid-cols-[70px_1fr] sm:grid-cols-[85px_1fr] md:grid-cols-[100px_1fr]'">
		<!-- Background -->
		<div :style="[backgroundColor, borderColor]"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 rounded-lg md:rounded-xl -z-10 animate__animated animate__zoomIn" :class="props.isPositionElementsOther ? 'border-none min-h-[45px] sm:h-[60px] md:h-[70px]' : 'border opacity-70 min-h-[35px] sm:h-[40px] md:h-[42px] lg:h-[60px]'">
		</div>

		<!-- Lado Esquerdo -->
		<div class="flex items-center">
			<!-- Imagem de destaque -->
			<div class="animate__animated animate__tada" :class="props.isPositionElementsOther ? 'w-[90px] sm:w-[120px] md:w-[135px]' : 'w-[55px] sm:w-[65px] md:w-[80px]'">
				<img :src="imageDT" onerror="this.src='/imgs/selo_fiel.png'" :class="props.isPositionElementsOther ? 'w-[inherit]' : ''" />
			</div>
		</div>

		<!-- Lado Direito -->
		<div class="justify-start items-center">

			<!-- Conteúdo de texto -->
			<div :style="`color: ${app.banner_final_colors_text_card_hub}`" class="py-10 md:py-8 lg:py-6">

				<div class="text-start">
					<!-- Description -->
					<div class="animate__animated animate__fadeIn" :class="props.isPositionElementsOther ? 'flex justify-end items-center' : ''">
						<p class="fm2 text-[11px] leading-3 sm:text-[14px] lg:text-base" :class="props.isPositionElementsOther ? 'text-end' : 'text-start'" v-html="props.description">
						</p>
						<UIcon v-if="props.isPositionElementsOther" class="text-2xl ms-3" name="i-material-symbols-arrow-forward-ios" />
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = store.contentApp;
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'description', 'imageDetach', 'isPositionElementsOther', 'colorsBackground']);

const backgroundColor = computed(() => {
	return `background-color: ${props.colorsBackground}`;
});

const borderColor = computed(() => {
	if(props.isPositionElementsOther) return;
	return `border-color: ${app.colors_border_one}`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});
</script>

<style scoped></style>
