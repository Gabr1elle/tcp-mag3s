<template>
	<div id="header-hotsite" class="fixed w-full z-50 animate__animated animate__fadeIn">
		<div class="bg-transparent py-2 lg:py-6">
			<UContainer class="flex justify-between items-center">
				<div>
				</div>
				<div>
					<UButton to="/login" size="xl" variant="outline" :ui="optionsButton" class="transition-all ease-in-out">
						<span :style="colorTextButton">{{ app.header_button_label_hotsite }}</span>
					</UButton>
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const bgColor = computed(() => {
	return `${app.header_colors_background_hotsite}`;
});

const colorButton = computed(() => {
	return `${app.header_button_background_colors_hotsite}`;
});

const colorTextButton = computed(() => {
	return `${app.header_button_text_colors_hotsite}`;
});

const colorTextButtonHover = computed(() => {
	return `${app.header_button_hover_text_colors_hotsite}`;
});

const optionsButton = ref({
	rounded: 'rounded-full',
	"padding": {
		"2xs": "px-2 py-1",
		"xs": "px-2.5 py-1.5",
		"sm": "px-2.5 py-1.5",
		"md": "px-3 py-2",
		"lg": "px-5 py-2.5",
		"xl": "px-8 py-2.5"
	},
	"variant": {
		"outline": "hover-btn color-text-button",
	}
});

onNuxtReady(() => {
	headerScrollStyle('header-hotsite', 200, 'animate__fadeInDown');
});
</script>

<style>
#header-hotsite.has-bg-color {
	background-color: v-bind(bgColor);
}

#header-hotsite .color-text-button {
	color: v-bind(colorTextButton);
}

#header-hotsite .hover-btn:hover {
	background-color: v-bind(colorButton) !important;
	color: v-bind(colorTextButtonHover);
}
</style>
