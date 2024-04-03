<template>
	<div class="pt-12 pb-32 lg:pb-32 fm1 leading-none" :style="[bgColor, colorText]">
		<UContainer class="">
			<!-- Botão voltar ao topo -->
			<div class="grid grid-flow-row gap-y-2 flex-col justify-center justify-items-center">
				<div class="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
					:style="[colorButton, colorTextButton]">
					<UIcon name="i-material-symbols-keyboard-arrow-up-rounded" class="w-8 h-8" @click.prevent="scrollToTop" />
				</div>
				<div class="cursor-pointer" @click.prevent="scrollToTop">
					<p class="leading-none">voltar ao topo</p>
				</div>
			</div>

			<!-- Itens do menu -->
			<div class="md:flex lg:flex-col justify-between items-center lg:m-auto lg:w-8/12 mt-12">
				<!-- Menu -->
				<ul
					class="flex flex-col lg:flex-row items-center md:items-start justify-center lg:w-full lg:justify-between lg:py-12">
					<NuxtLink :to="item.route" v-for="(item, index) in menu"
						:class="[`${index + 1 >= menu.length ? 'mb-0' : 'mb-8 last:mb-0 lg:mb-4'}`]">
						<li>{{ item.name }}</li>
					</NuxtLink>
				</ul>

				<!-- Brand Principal Mobile -->
				<div class="flex justify-center mt-12 md:mt-0 lg:hidden">
					<LpImageBrand />
				</div>
			</div>

			<!-- Direitos autorais -->
			<div class="flex justify-center lg:justify-between lg:items-end">
				<!-- Brand Principal Desk -->
				<div class="justify-center mt-12 md:mt-0 hidden lg:flex">
					<LpImageBrand />
				</div>

				<div>
					<p class="text-sm sm:text-base text-center mt-12">&copy; {{ $year() }} <span
							class="fm3 uppercase">{{ app.config_name_client_project }}</span> - Todos os direitos reservados</p>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { $year } = useNuxtApp();

const menu = ref([
	{ name: 'termos de uso e política', route: '/termos' },
	{ name: 'regulamento', route: '/regulamento' },
	{ name: 'perguntas frequentes', route: '/faq' },
	{ name: 'contato', route: '/contato' },
]);

const bgColor = computed(() => {
	return `background-color: ${app.footer_colors_background_hotsite}`;
});

const colorText = computed(() => {
	return `color: ${app.footer_colors_text_hotsite}`;
});

const colorButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite};`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite};`;
});

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
