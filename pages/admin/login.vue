<template>
	<UContainer class="fm2 py-30 lg:px-40 text-stone-50 h-screen">
		<div class="grid grid-cols-1 md:grid-cols-2 auto-rows-min md:auto-rows-auto md:min-h-screen items-center">
			<div class="flex justify-center lg:justify-start py-10 lg:py-0">
				<img class="w-5/12 sm:w-4/12 md:w-[330px]" src="/imgs/mag3s_dark.svg" alt="Logo Mag3s Tecnologia" />
			</div>
			<div>
				<UForm :state="store.login" :schema="schema" @submit="store.loggingIn(useToast)">
					<div class="mb-8">
						<h1 class="fm3 text-2xl">Bem-vindo!</h1>
						<span>Faça o login para administrar o <strong class="fm3">{{
					useNuxtApp().$config.public.ApiIncentiveClientId }}</strong>:</span>
					</div>

					<!-- E-mail -->
					<div class="flex flex-col mb-6">
						<UFormGroup label="E-mail:" name="email" size="lg" :ui="configGroupInput">
							<UInput id="email" name="email" type="email" placeholder="Digite seu e-mail" v-model="store.login.email"
								:ui="configInput" icon="i-material-symbols-account-circle-outline" />
						</UFormGroup>
					</div>

					<!-- Password -->
					<div class="flex flex-col">
						<UFormGroup label="Senha:" name="password" size="lg" :ui="configGroupInput">
							<UInput id="password" name="password" placeholder="Digite sua senha" :type="passView"
								v-model="store.login.password" :ui="configInput" icon="i-material-symbols-password-rounded">
								<template #trailing>
									<UButton v-show="store.login.password !== ''" color="primary" variant="link" :icon="passIcon"
										:padded="false" @click="togglePassView" />
								</template>
							</UInput>
						</UFormGroup>
					</div>

					<!-- Button -->
					<div class="flex justify-end">
						<UButton label="fazer login" color="black" variant="solid" size="lg" type="submit" :loading="store.loading"
							:trailing="false" class="mt-8 md:mt-4" :block="false" icon="i-material-symbols-login-rounded" />
					</div>
				</UForm>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
import { object, string } from 'yup';

definePageMeta({
	middleware: ['login'],
});

useHead({
	bodyAttrs: {
		class: 'bg-gradient-to-tr from-slate-950 to-yellow-600 bg-no-repeat',
	},
});

const schema = object({
	email: string().email('E-mail inválido').required('Campo obrigatório'),
	password: string().required('Campo obrigatório'),
});

const store = useStoreAdmin();
const toast = useToast();
const passView = ref('password');
const passIcon = ref('i-material-symbols-visibility-rounded');

function togglePassView() {
	switch (passView.value) {
		case 'password':
			passView.value = 'text';
			passIcon.value = 'i-material-symbols-visibility-off-rounded';
			break;

		default:
			passView.value = 'password';
			passIcon.value = 'i-material-symbols-visibility-rounded';
			break;
	}
}

const configInput = ref({
	rounded: 'rounded-xl',
	icon: {
		trailing: {
			pointer: '',
		},
	},
	variant: {
		outline: 'bg-white',
	},
});

const configGroupInput = ref({
	label: {
		base: 'text-white'
	},
	error: 'text-red-600'
});

onNuxtReady(() => {
	if (store.logout) {
		toast.add({
			id: 'show_status_logout',
			color: `red`,
			title: `Atenção`,
			icon: `i-material-symbols-warning-outline-rounded`,
			description: `Faça o Login para Continuar`,
			timeout: 3500,
		});

		store.logout = false;
	}
});
</script>
