<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-1"></h1>
			<p class="fm2 text-lg">
				{{ descriptionText }}
				<ULink type="link" :to="{
					path: '/checkout/login',
					query: {
						idPkg: storeCheckout.packageChosen.id,
						idOB: storeCheckout.packageChosenOB.id,
					},
				}" class="fm3">Clique aqui</ULink>
				.
			</p>
		</div>

		<!-- Primeira parte do Cadastro -->
		<UForm id="formRegisterOne" :state="storeCheckout.formRegister" :schema="schema" class="space-y-4 mt-6" @submit="
			storeCheckout.registerEmail(
				useToast,
				storeCheckout.packageChosen.id,
				storeCheckout.packageChosenOB.id,
				'/checkout/cadastro2'
			)
			">
			<UFormGroup label="E-mail:" name="email">
				<UInput size="xl" v-model="storeCheckout.formRegister.email" type="email" color="white" variant="outline"
					:ui="configInput" icon="i-material-symbols-stacked-email-outline" inputmode="'email'" />
			</UFormGroup>

			<UFormGroup label="Senha:" name="password">
				<UInput size="xl" v-model="storeCheckout.formRegister.password" color="white" :type="passView.password"
					:ui="{ ...configInput, icon: { trailing: { pointer: '' } } }"
					icon="i-material-symbols-passkey-outline-rounded">
					<template #trailing>
						<UButton v-show="storeCheckout.formRegister.password !== ''" color="gray" variant="link"
							:icon="passIcon.password" :padded="false" @click="togglePassView('password')" />
					</template>
				</UInput>
			</UFormGroup>

			<UFormGroup label="Confirme a senha:" name="confirmPassword">
				<UInput size="xl" v-model="storeCheckout.formRegister.confirmPassword" color="white"
					:type="passView.confirmPassword" :ui="{ ...configInput, icon: { trailing: { pointer: '' } } }"
					icon="i-material-symbols-passkey-outline-rounded">
					<template #trailing>
						<UButton v-show="storeCheckout.formRegister.confirmPassword !== ''" color="gray" variant="link"
							:icon="passIcon.confirmPassword" :padded="false" @click="togglePassView('confirmPassword')" />
					</template>
				</UInput>
			</UFormGroup>

			<UFormGroup name="terms">
				<UCheckbox label="Termos de uso"
					help="Li e aceito os regulamentos e concordo com a política de privacidade e termos de uso."
					v-model="storeCheckout.formRegister.terms" :ui="configCheckbox" />
			</UFormGroup>

			<div class="flex justify-center">
				<UButton size="xl" label="continuar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
					class="fm3" :loading="storeCheckout.formRegister.loading" trailing />
			</div>
		</UForm>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { object, string, mixed } from 'yup';
import * as Yup from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;
const toast = useToast();

definePageMeta({
	layout: 'checkout-default',
	middleware: [
		'auth-client',
		'purchase-list-packages',
		'purchase-chosen-package',
		'redirect-auth-user-register-one',
	],
});

const passView = reactive({
	password: 'password',
	confirmPassword: 'password',
});

const passIcon = reactive({
	password: 'i-material-symbols-visibility-rounded',
	confirmPassword: 'i-material-symbols-visibility-rounded',
});

function togglePassView(view) {
	switch (passView[view]) {
		case 'password':
			passView[view] = 'text';
			passIcon[view] = 'i-material-symbols-visibility-off-rounded';
			break;
		default:
			passView[view] = 'password';
			passIcon[view] = 'i-material-symbols-visibility-rounded';
			break;
	}
}

const schema = object({
	email: string().email('E-mail inválido').required('Campo obrigatório'),
	password: string()
		.min(8, 'Mínimo de 8 caracteres')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
			'A senha deve conter pelo menos um número, uma letra maiúscula e uma letra minúscula'
		)
		.required('Campo obrigatório'),
	confirmPassword: string()
		.oneOf([Yup.ref('password')], 'As senhas não coincidem')
		.required('Campo obrigatório'),
	terms: mixed()
		.oneOf([true], 'Você deve aceitar os termos de uso para continuar.')
		.required('Campo obrigatório'),
});

const textColor = computed(() => {
	return `${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.create_user_text_title_one}`;
});

const descriptionText = computed(() => {
	return `${app.create_user_text_description_one}`;
});

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: false },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		16,
		true
	);
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
		xl: 'px-20 py-2',
	},
});

const configCheckbox = ref({
	label: 'text-terms fm3',
	help: 'text-sm text-terms fm2',
});
</script>

<style>
#formRegisterOne .text-terms {
	color: v-bind(textColor);
}
</style>
