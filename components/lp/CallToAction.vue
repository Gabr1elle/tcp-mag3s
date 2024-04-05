<template>
  <UButton to="/checkout/pacotes" :label="labelButton" :ui="{ rounded: 'rounded-full' }" block size="xl" :style="[colorBgButton, colorTextButton]" class="fm3 fixed bottom-6 lg:bottom-10 left-1/2 !-translate-x-1/2 max-w-[80%] md:max-w-xl uppercase animate__animated animate__fadeInDown z-10" :loading="storeCheckout.packageLoading" trailing />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
const app = useStoreApp().contentApp;
const storeCheckout = useStoreCheckout();

const labelButton = ref('Quero participar');

const colorBgButton = computed(() => {
  return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
  return `color: ${app.colors_text_button_hotsite}`;
});
</script>

<style scoped></style>
