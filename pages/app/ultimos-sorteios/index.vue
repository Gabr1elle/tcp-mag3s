<template>
	<AppLayoutBgDefault />
	<div v-show="!storeIncentive.loading">
		<AppLayoutHeader
			v-if="app.config_will_have_hotsite"
			:hasLogout="false"
			:bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app"
			:isLogoDark="false"
		/>

		<UContainer class="py-32" :class="hasHeader">
			<div class="max-w-[700px] m-auto">
				<!-- Banner -->

				<div v-if="storeIncentive.lastDrawHeldFull">
					<AppBannersCard
						:linkSource="
							storeIncentive.lastDrawHeldLink
						"
						:hasImageDetach="false"
						:loading="storeIncentive.lastDrawLoading"
						:title="storeIncentive.lastDrawHeldFull.fullDate"
						:subtitle="
							store.descriptionAwardCurrent(
								storeIncentive.lastDrawHeldFull.name
							)
						"
						:countdown="false"
						:callToAction="app.banner_text_card_label_button_one"
						:hasDescription="false"
						:description="false"
						:imageAward="storeIncentive.lastDrawHeldFull.image"
					/>
				</div>

				<!-- Campo de pesquisa -->
				<AppOthersInputSearching
					v-if="storeIncentive.listDrawsLatest"
					inputPlaceholder="Buscar por prêmio"
					:hasMaskInput="null"
					@input="storeIncentive.filterListDrawsLatest(store.searchingValue)"
					:inputModeOption="'search'"
					class="my-8"
				/>

				<!-- Card mostrando os ultimos sorteios -->
				<div class="grid gap-10 lg:gap-14">
					<AppGameInfoCard
						v-for="card in storeIncentive.filterListDrawsLatest(
							store.searchingValue
						)"
						:key="card"
						:titulo="card.name"
						:subtitulo="card.subtitulo"
						:customBackground="card.hasBg"
						:imagemSrc="card.image"
						:source="card.source"
						:date="card.date"
						:link="true"
					/>
				</div>

				<!-- Feedback de pesquisa caso não exista o sorteio -->
				<div
					v-if="
						!storeIncentive.filterListDrawsLatest(store.searchingValue)
							.length && store.searchingValue
					"
					class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center text-center animate__animated animate__fadeIn"
				>
					<h2 class="text-white">Busca de prêmio não encontrada!</h2>
				</div>
			</div>
		</UContainer>
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
});
definePageMeta({
	middleware: ['auth-user'],
});

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite,
	};
});
</script>

<style scoped></style>
