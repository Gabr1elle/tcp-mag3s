<template>
	<div id="spin-loading" class="relative block w-[30px] md:w-[40px] h-[30px] md:h-[40px]">
		<span
			class="block w-[inherit] h-[inherit] border-2 md:border-4 border-solid border-transparent rounded-full border-r-ldg border-t-ldg border-ldg animate-spin"></span>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = store.contentApp;

const borderColor = computed(() => {
	return `${app.loading_border_colors_one}`
});

const borderColorComplement = computed(() => {
	return `${app.loading_border_colors_two}`
});

</script>

<style scoped>
#spin-loading .border-ldg {
	border-color: v-bind(borderColorComplement);
}

#spin-loading .border-r-ldg {
	border-right-color: v-bind(borderColor);
}

#spin-loading .border-t-ldg {
	border-top-color: v-bind(borderColor);
}
</style>
