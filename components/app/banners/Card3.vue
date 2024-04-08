<template>
	<NuxtLink :to="props.linkSource"
		class="w-full relative grid grid-flow-col auto-cols-auto justify-between gap-4 px-2 sm:px-4 md:px-6"
		:target="props.positionLeftImageDetach ? '_blank' : '_self'">
		<!-- Background -->
		<div :style="backgroundColor"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 min-h-[45px] sm:h-[60px] md:h-[70px] rounded-lg md:rounded-2xl -z-10 animate__animated animate__zoomIn"
			:class="props.positionLeftImageDetach ? 'opacity-100' : 'opacity-70'">
		</div>

		<!-- Conteúdo de texto -->
		<div class="flex items-center col-span-2"
			:class="props.positionLeftImageDetach ? 'justify-end order-2' : 'order-1 me-4 justify-start'">

			<div :style="`color: ${store.contentApp.banner_detach_colors_text_hub}`"
				class="py-6 sm:py-12 md:py-14 lg:py-9 h-fit">

				<div class=""
					:class="props.positionLeftImageDetach ? 'flex items-center justify-end' : 'text-start max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-max'">
					<!-- Description -->
					<div class="animate__animated animate__fadeIn">
						<p class="fm2 text-[11px] leading-3 sm:text-[14px] lg:text-base sm:leading-4 lg:leading-normal text-start"
							v-html="props.description">
						</p>
					</div>

					<!-- Seta de Link -->
					<UIcon v-if="props.positionLeftImageDetach" class="text-2xl ms-3" name="i-material-symbols-arrow-forward-ios" />
				</div>
			</div>
		</div>

		<!-- Imagem de destaque -->
		<div class="flex items-center col-span-1" :class="props.positionLeftImageDetach ? 'order-1' : 'order-2'">
			<div class="animate__animated animate__tada"
				:class="props.positionLeftImageDetach ? 'w-[65px] sm:w-[90px] md:w-[100px]' : 'w-[80px] sm:w-[120px] md:w-[140px]'">
				<img :src="imageDT" onerror="this.src='/imgs/thumb_premios1.png'"
					:class="props.positionLeftImageDetach ? 'w-[inherit]' : ''" />
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'linkOpenTarget', 'description', 'imageDetach', 'positionLeftImageDetach']);

const backgroundColor = computed(() => {
	return `background-color: ${store.contentApp.banner_detach_colors_background_hub}`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});
</script>

<style scoped></style>
