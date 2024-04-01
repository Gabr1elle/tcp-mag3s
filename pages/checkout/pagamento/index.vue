<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-1"></h1>
		</div>

		<!-- Escolha da forma de pagamento -->
		<UForm id="formChoicePayment" :state="state" class="space-y-4 mt-6"
			@submit="storeCheckout.paymentMethod(useToast, storeCheckout.packageChosen.id, storeCheckout.packageChosenOB.id, storeCheckout.formRegister.configPayment.choicePathTo)">

			<URadio v-model="storeCheckout.formRegister.selectedPayment"
				v-for="option of storeCheckout.formRegister.optionsPayment" :key="option.value" v-show="option.showing"
				v-bind="option" :ui="configRadio" @input="storeCheckout.changeMethodPayment(option)">
				<template #label>
					<div class="flex items-center">
						<UIcon :name="option.label === 'Pix' ? `i-ic-round-pix` : `i-ic-baseline-credit-card`" class="w-9 h-9 me-2"
							:style="textColor" />
						<p class="fm2 text-xl" :style="textColor"> {{ option.label }} </p>
					</div>
				</template>
			</URadio>

			<div class="flex flex-col items-center w-full">
				<!-- Order Bump -->
				<CheckoutOrderBump v-if="storeCheckout.formRegister.selectedPayment && hasIdPkgOB"
					class="mt-10 sm:w-10/12 md:w-8/12 lg:w-7/12 my-auto animate__animated animate__tada" />

				<!-- Botão avançar -->
				<div>
					<UButton size="xl" :label="storeCheckout.formRegister.configPayment.labelButton" type="submit"
						:ui="configButton" :style="[colorBgButton, colorTextButton]" class="fm3 mt-6"
						:loading="storeCheckout.formRegister.loading || !storeCheckout.formRegister.configPayment.labelButton"
						trailing :disabled="!storeCheckout.formRegister.selectedPayment" />
				</div>
			</div>
		</UForm>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

const route = useRoute();

definePageMeta({
	layout: 'checkout-default',
	middleware: ['auth-client', 'verify-accout-user-data', 'purchase-list-packages', 'purchase-chosen-package', 'redirect-auth-user-payment-creditcard', 'redirect-auth-user-payments']
});

const hasIdPkgOB = computed(() => {
	return Boolean(route.query.idOB);
})

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.create_user_text_title_three}`;
});

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: true },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		50,
		true);

	switch (storeCheckout.formRegister.selectedPayment) {
		case 301:
			storeCheckout.formRegister.configPayment.labelButton = `pagar com ${storeCheckout.formRegister.optionsPayment.find(payment => payment.value === 301).label}`;
			break;

		case 501:
			storeCheckout.formRegister.configPayment.labelButton = `pagar com ${storeCheckout.formRegister.optionsPayment.find(payment => payment.value === 501).label}`;
			break;

		default:
			storeCheckout.formRegister.configPayment.labelButton = `escolha antes de continuar...`;
			break;
	}

});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configRadio = ref({
	"wrapper": 'items-center',
});

const configButton = ref({
	"rounded": 'rounded-full',
	"padding": {
		"xl": "px-12 py-2"
	},
});
</script>

<style lang="scss" scoped></style>
