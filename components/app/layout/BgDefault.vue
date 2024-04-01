<template>
	<div :style="background"
		class="overflow-hidden bg-cover bg-scroll lg:bg-fixed fixed top-0 right-0 left-0 bottom-0 bg-no-repeat bg-top -z-10">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

let widthWindow = ref(null);

const background = computed(() => {
	if (widthWindow.value != null && widthWindow.value <= 912) {
		return `background-image: url('${pathAssets}${app.layout_background_app_mobile}'), url('/imgs/bg_default_mobile.png'); background-color: ${app.colors_background_one}`;
	}

	if (widthWindow.value != null && widthWindow.value > 912) {
		return `background-image: url('${pathAssets}${app.layout_background_app}'), url('/imgs/bg_default.png'); background-color: ${app.colors_background_one}`;
	}

	return `background-color: ${app.colors_background_one}`;
});

onNuxtReady(() => {
	widthWindow.value = window.innerWidth;
});
</script>

<style scoped></style>
