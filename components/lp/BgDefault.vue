<template>
	<div :style="background"
		class="overflow-hidden bg-scroll lg:bg-fixed bg-cover top-0 right-0 left-0 bottom-0 bg-no-repeat bg-top h-screen lg:h-full -z-10" :class="position">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const props = defineProps(['imageMobile', 'image', 'placeholderImage', 'placeholderImageMobile', 'bgColor', 'position']);

let widthWindow = ref(null);

const background = computed(() => {
	if (widthWindow.value != null && widthWindow.value <= 912) {
		return `background-image: url('${props.imageMobile}'), url('${props.placeholderImageMobile}'); background-color: ${props.bgColor}`;
	}

	if (widthWindow.value != null && widthWindow.value > 912) {
		return `background-image: url('${props.image}'), url('${props.placeholderImage}'); background-color: ${props.bgColor}`;
	}

	return `background-color: ${props.bgColor}`;
});

onNuxtReady(() => {
	widthWindow.value = window.innerWidth;
})
</script>

<style scoped></style>
