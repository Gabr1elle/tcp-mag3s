<template>
  <!-- BG de fundo -->
  <AppLayoutBgDefault />

  <!-- Header -->
  <AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app"
    :textColor="app.header_colors_text_app" :isLogoDark="false" />

  <UContainer>
    <!-- Influencers Ranking -->
    <LpInfluencerRace v-if="app.config_will_have_influencer_race" class="py-6" :isDark="false" backgroundColor="transparent" />

    <!-- Menu Behaviour -->
    <div v-if="storeIncentive.userLoggedIn">
      <AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
      <div v-if="app.config_will_have_hotsite">
        <AppLayoutMenuBehaviour />
        
					<div class="mt-16 md:mt-24"></div>
      </div>
    </div>
  </UContainer>


</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();
const app = useStoreApp().contentApp;


</script>

<style scoped></style>