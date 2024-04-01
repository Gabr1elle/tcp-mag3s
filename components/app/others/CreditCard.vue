<template>
	<div class="max-w-[600px] pt-6 m-auto lg:w-full lg:m-0">
		<div v-if="storeCheckout.hasCardCreditRegister" class="flex justify-end">
			<UButton size="sm" label="remover cartão" type="button" color="red" class="fm2 mt-6"
				@click="storeCheckout.formRegister.isOpenModalCreditCardRemove = true"
				icon="i-material-symbols-delete-rounded" />
		</div>

		<UForm id="formCreditCard" :state="storeCheckout.formRegister.creditCard" :schema="schema" class="space-y-4"
			filled-form :class="storeCheckout.hasCardCreditRegister ? 'mt-0' : 'mt-6, '" @submit="storeCheckout.paymentCreditCard(useToast, props.packageChosen,
			props.packageChosenOB, '/checkout/feedback', props.willHavePurchese, 'finalizar pagamento')">
			<UFormGroup label="Número do cartão:" name="number">
				<UInput size="xl" v-model="storeCheckout.formRegister.creditCard.number" type="text" color="white"
					variant="outline" :ui="configInput" v-maska data-maska="#### #### #### ####" data-maska-tokens="#:[0-9*]"
					icon="i-ic-baseline-credit-card" :disabled="storeCheckout.hasCardCreditRegister" />
			</UFormGroup>

			<UFormGroup label="Nome (como consta no cartão):" name="name">
				<UInput size="xl" v-model="storeCheckout.formRegister.creditCard.name" type="text" color="white"
					:ui="configInput" icon="i-material-symbols-person-edit-outline-rounded"
					:disabled="storeCheckout.hasCardCreditRegister" />
			</UFormGroup>

			<div class="grid grid-cols-2 gap-4">
				<UFormGroup label="Validade:" name="validity">
					<UInput size="xl" v-model="storeCheckout.formRegister.creditCard.validity" type="text" color="white"
						:ui="configInput" v-maska data-maska="##/####" data-maska-eager icon="i-material-symbols-calendar-month"
						:disabled="storeCheckout.hasCardCreditRegister" />
				</UFormGroup>

				<UFormGroup label="CVV:" name="cvv">
					<UInput size="xl" v-model="storeCheckout.formRegister.creditCard.cvv" type="text" color="white"
						:ui="configInput" v-maska data-maska="###" icon="i-material-symbols-123-rounded"
						:disabled="storeCheckout.hasCardCreditRegister" />
				</UFormGroup>
			</div>

			<div class="flex justify-center">
				<UButton size="xl" :label="storeCheckout.formRegister.configPayment.labelButton" type="submit"
					:ui="configButton" :style="[colorBgButton, colorTextButton]" class="fm3 mt-6"
					:loading="storeCheckout.formRegister.loading || !storeCheckout.formRegister.configPayment.labelButton"
					trailing :disabled="props.hasDisableButton && storeCheckout.hasCardCreditRegister" />
			</div>
		</UForm>

		<!-- Modal de exclusão de cartão cadastrado -->
		<UModal v-model="storeCheckout.formRegister.isOpenModalCreditCardRemove">
			<UCard :ui="{
			ring: '',
			divide: 'divide-y divide-gray-100 dark:divide-gray-800',
		}">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="fm3 text-base uppercase" :style="textColor">
							Excluir Cartão de Crédito?
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="
			storeCheckout.formRegister.isOpenModalCreditCardRemove = false
			" />
					</div>
				</template>

				<div class="fm2" :style="textColor">
					<h2 class="text-lg lg:text-xl">
						Deseja excluir o cartão
						{{ storeCheckout.formRegister.creditCard.number }}?*
					</h2>
					<p class="text-sm text-red-600">
						*Essa ação não poderá ser desfeita.
					</p>
					<div class="flex justify-end">
						<UButton size="xl" color="red" type="button" label="remover" class="fm3 uppercase mt-4 px-6"
							:loading="storeCheckout.formRegister.loading" @click="storeCheckout.deleteCreditCard(useToast)" />
					</div>
				</div>

				<Placeholder class="h-32" />
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { object, string } from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

const schema = object({
	number: string().required('Campo obrigatório.'),
	name: string().trim().matches(/^(\S+\s){1,}\S+$/, 'Por favor, insira seu nome como consta no cartão.').required('Campo nome é obrigatório.'),
	validity: string().matches(/^(0[1-9]|1[0-2])\/(19|20)\d{2}$/, 'Por favor, insira a data de validade corretamente (MM/AAAA)').required('Campo obrigatório.'),
	cvv: string().required('Campo obrigatório.'),
});

const props = defineProps(['willHavePurchese', 'hasDisableButton', 'packageChosenOB', 'packageChosen']);

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.checkout_card_text_title}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configInput = ref({
	rounded: 'rounded-full',
	variant: { outline: 'bg-white' }
});

const configButton = ref({
	rounded: 'rounded-full',
	padding: {
		xl: 'px-12 py-2',
	},
});
</script>

<style scoped></style>
