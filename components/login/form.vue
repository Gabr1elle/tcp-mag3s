<template>
	<div>
		<UForm id="formLogin" :state="storeIncentive.formLogin" :schema="schema" class="space-y-4"
			@submit="storeIncentive.userLogin(useToast, true, props.isCheckout)">
			<UFormGroup label="Seu e-mail" name="user">
				<UInput size="xl" icon="i-material-symbols-person-check-outline-rounded" v-model="storeIncentive.formLogin.user"
					type="text" color="white" variant="outline" :ui="{ ...configInput, variant: { outline: 'bg-white' } }"
					inputmode="email" />
			</UFormGroup>

			<UFormGroup label="Sua senha" name="password">
				<UInput size="xl" v-model="storeIncentive.formLogin.password" color="white" :type="passView.password"
					:ui="{ ...configInput, icon: { trailing: { pointer: '' } }, variant: { outline: 'bg-white' } }"
					icon="i-material-symbols-passkey-outline-rounded">
					<template #trailing>
						<UButton v-show="storeIncentive.formLogin.password !== ''" color="gray" variant="link"
							:icon="passIcon.password" :padded="false" @click="togglePassView('password')" />
					</template>
				</UInput>
			</UFormGroup>

			<p class="text-center mt-4">
				Esqueceu sua senha?
				<NuxtLink to="/recuperar-senha" class="fm3 decoration-solid">
					Clique aqui</NuxtLink>
			</p>

			<div class="flex justify-center">
				<UButton size="xl" label="entrar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
					class="fm3" :loading="!storeIncentive.loading" trailing />
			</div>
		</UForm>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { string, object } from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['isCheckout']);

const passView = reactive({
	password: 'password',
});

const passIcon = reactive({
	password: 'i-material-symbols-visibility-rounded',
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
	user: string().email('E-mail inválido').required('Campo obrigatório'),
	password: string().required('Campo obrigatório'),
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configInput = ref({
	rounded: 'rounded-full',
});

const configButton = ref({
	rounded: 'rounded-full',
	padding: {
		xl: 'px-16 py-2.5',
	},
});
</script>

<style lang="scss" scoped></style>
