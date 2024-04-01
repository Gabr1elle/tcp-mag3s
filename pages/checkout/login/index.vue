<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-1"></h1>
		</div>

		<!-- Login -->
		<LoginForm :isCheckout="true" class="mt-8" />
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
	middleware: ['login-checkout', 'auth-client', 'purchase-list-packages', 'purchase-chosen-package']
});

const titleText = computed(() => {
	return `${app.login_user_text_title}`;
});

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: false },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		16,
		true);
});
</script>

<style></style>
