<template>
	<div class="max-w-[700px] m-auto lg:w-full lg:m-0">
		<div>
			<!-- Título -->
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-4"></h1>

			<!-- Descrição -->
			<div>
				<p v-for="item in feedbackDescription" class="fm2 text-base lg:text-xl mb-4">
					<span class="fm3 me-2">{{ item.one }}</span>
					<span>{{ item.two }}</span>
				</p>
			</div>

			<!-- Finalizar -->
			<div class="flex items-center justify-center">
				<div>
					<UButton size="xl" label="Finalizar" type="button" :ui="configButton"
						:style="[colorBgButton, colorTextButton]" class="fm3 mt-6"
						@click.prevent="storeCheckout.finishPurchase" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	layout: 'checkout-default',
	middleware: ['auth-client', 'purchase-list-packages', 'purchase-chosen-package', 'redirect-auth-user-payment-feedback']
});

const titleText = computed(() => {
	return `${app.checkout_feedback_text_title}`;
});

const feedbackDescription = computed(() => {
	if (storeCheckout.formRegister.feedbackPayment === 'pix') return app.checkout_feedback_pix_text_list_description.list;
	if (storeCheckout.formRegister.feedbackPayment === 'credit-card') return app.checkout_feedback_card_credit_text_list_description.list;
});

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: true },
			{ step: 2, complete: true },
			{ step: 3, complete: true },
		],
		100,
		true);
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configButton = ref({
	"rounded": 'rounded-full',
	"padding": {
		"xl": "px-8 py-2"
	},
});
</script>

<style lang="scss" scoped></style>
