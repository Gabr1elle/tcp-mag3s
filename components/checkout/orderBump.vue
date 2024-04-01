<template>
	<div class="fm2 rounded-xl p-4" :style="[colorBackground, colorText]">
		<div class="fm3 flex justify-end items-center md:translate-x-8">
			<div class="relative">
				<p class="tracking-tighter text-7xl md:text-[4.9rem] translate-x-3.5 md:translate-x-4 -translate-y-2">
					{{ app.purchase_tables_text_title_qtd_order_bump }}</p>
				<img :src="storeCheckout.packageChosenOB.image" onerror="this.src='/imgs/checkout/package_image_1.png'"
					class="absolute -top-10 w-[90px]" alt="">
			</div>
			<p class="uppercase text-xl md:text-1xl ps-5 pe-2 md:pe-8 py-1 md:py-1.5 rounded-e-xl" :style="colorBackgroundTwo">
				{{ app.purchase_tables_text_title_order_bump }}
			</p>
		</div>
		<div>
			<p><span id="descriptionOB" v-html="app.purchase_tables_text_description_order_bump"></span> <strong
					class="fm3 inline-block animate__animated animate__flash animate__repeat-3">{{
						storeCheckout.diferencePriceOrderBump
					}}</strong>!</p>
		</div>
		<div id="checkOB" class="mt-3 cursor-pointer">
			<UCheckbox v-model="storeCheckout.selectedOB" name="enableOB" :label="app.purchase_tables_text_checkbox_order_bump" :ui="configCheckbox"
				@change="storeCheckout.changePackage(route.query.idPkg, route.query.idOB)" />
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;

const route = useRoute();

const storeIncentive = useStoreIncentive();
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

const colorTD = computed(() => {
	return app.purchase_tables_text_colors_order_bump;
})

const colorBackground = computed(() => {
	return `background-color: ${app.purchase_tables_background_colors_order_bump}`;
});

const colorBackgroundTwo = computed(() => {
	return `background-color: ${app.purchase_tables_background_colors_order_bump_two}`;
});

const colorText = computed(() => {
	return `color: ${app.purchase_tables_text_colors_order_bump}`;
});

const configCheckbox = ref({
	"label": 'fm3 textColor cursor-pointer'
});

onNuxtReady(() => {
	// aplicando classe de fonte para a descrição do order bump
	Array.from(document.getElementById('descriptionOB').getElementsByTagName('strong')).forEach(element => {
		element.classList.add('fm3');
	});
});
</script>

<style>
#checkOB .textColor {
	color: v-bind(colorTD);
}
</style>
