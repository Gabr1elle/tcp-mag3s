<template>
  <!-- Header -->
  <AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app"
    :textColor="app.header_colors_text_app" :isLogoDark="false" />

  <div class="relative h-full w-full" :style="background">
    <UContainer
    >
      <!-- Influencers Ranking -->
      <LpInfluencerRace v-if="app.config_will_have_influencer_race" class="py-6" />

      <!-- Menu Behaviour -->
      <div v-if="storeIncentive.userLoggedIn">
        <AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
        <div v-if="app.config_will_have_hotsite">
          <div class="md:mt-14"></div>
          <AppLayoutMenuBehaviour />
        </div>
      </div>
    </UContainer>
  </div>


</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();
const app = useStoreApp().contentApp;

const background = computed(() => {
  return `background-color: ${app.session_background_colors_hotsite_one}`;
});


</script>

<style scoped></style>