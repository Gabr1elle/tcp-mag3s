<template>
	<div class="max-w-[700px] m-auto lg:w-full lg:m-0">
		<div>
			<!-- Titulo -->
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-4"></h1>

			<!-- Descrição -->
			<ul>
				<li v-for="item in descriptionPayPix" class="fm2 flex text-base lg:text-xl mb-0.5">
					<span class="fm3 me-2">{{ item.one }}</span>
					<p>{{ item.two }}</p>
				</li>
			</ul>
		</div>

		<!-- QRCode de pagamento via Pix -->
		<div class="grid md:grid-cols-2 justify-center">
			<div class="mt-4">
				<img :src="QRCodePix" alt="" class="max-w-[300px] rounded-2xl">
			</div>

			<div class="flex flex-col items-center justify-center md:items-start">
				<div>
					<UButton size="xl" label="copiar código" type="button" icon="i-ic-round-pix" :ui="configButton"
						:style="[colorBgButton, colorTextButton]" class="fm3 mt-6" @click.prevent="copyAndPasteCodePix" />
				</div>
				<div>
					<UButton size="xl" label="já paguei" type="button" icon="i-ic-round-playlist-add-check" :ui="configButton"
						:style="[colorBgButton, colorTextButton]" class="fm3 mt-6"
						@click.prevent="storeCheckout.showFeedback(storeCheckout.packageChosen.id, storeCheckout.packageChosenOB.id, '/checkout/feedback', 'pix')" />
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
	middleware: ['auth-client', 'purchase-list-packages', 'purchase-chosen-package', 'redirect-auth-user-payment-pix']
});

const titleText = computed(() => {
	return `${app.checkout_pix_text_title}`;
});

const descriptionPayPix = computed(() => {
if(storeCheckout)
	return app.checkout_pix_text_list_steps_description_three.list;
});

const QRCodePix = computed(() => {
	return storeCheckout.formRegister.paymentPix.qrCode;
});

function copyAndPasteCodePix() {
	const toast = useToast();
	navigator.clipboard.writeText(storeCheckout.formRegister.paymentPix.copyPaste);

	toast.add({
		id: 'show_pix_copy_and_paste',
		color: `green`,
		title: `Fantástico 🎉`,
		description: `código copiado com sucesso.`,
		icon: `i-ic-round-pix`,
		timeout: 3500,
	});
}

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: true },
			{ step: 2, complete: true },
			{ step: 3, complete: false },
		],
		65,
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
