<template>
	<AppLayoutBgDefault />

	<AppLayoutHeader
		v-if="app.config_will_have_hotsite"
		:hasLogout="false"
		:bgColor="app.header_colors_background_app"
		:textColor="app.header_colors_text_app"
		:isLogoDark="false"
	/>

	<div
		class="min-h-screen flex items-center pt-12"
		:class="hasHeader"
		v-show="!storeIncentive.loading"
		:style="textColor"
	>
		<UContainer v-if="storeIncentive.inventory.choosePrizeDetails">
			<!-- Imagem do Prêmio -->
			<div
				v-show="storeIncentive.loadingInventory"
				class="animate__animated animate__zoomIn"
			>
				<img
					:src="storeIncentive.inventory.choosePrizeDetails.image"
					onerror="this.src='/imgs/exemplo_premio_01.png'"
					class="justify-center m-auto w-[320px] md:w-[400px] lg:w-[300px] mt-3"
				/>
			</div>
			<div
				v-if="!storeIncentive.loadingInventory"
				class="w-[300px] sm:w-[320px] md:w-[380px] h-[300px] sm:h-[320px] md:h-[380px] flex justify-center items-center m-auto"
			>
				<AppOthersSpin />
			</div>

			<!-- Detalhes do Prêmio -->
			<div class="flex flex-col items-center mt-2">
				<div
					v-if="storeIncentive.inventory.choosePrizeDetails.typePrize === 'ScratchCard'"
				>
					<div class="flex items-center animate__animated animate__fadeInDown">
						<div class="me-3">
							<img
								:src="imgScratchCard"
								onerror="this.src='/imgs/rabiscadinha.png'"
								class="w-[32px] md:w-[40px]"
							/>
						</div>
						<p class="fm3 text-[16px] md:text-[24px] uppercase">
							{{ store.contentApp.sessions_title_two }}
						</p>
					</div>
				</div>
				<div v-else>
					<div class="flex justify-center items-center">
						<p class="fm3 text-[10px] md:text-[14px] py-3">
							{{ store.contentApp.sessions_title_three }}
						</p>
					</div>
					
					<div
						class="grid grid-cols-[repeat(4,40px)] md:grid-cols-[repeat(4,50px)] lg:grid-cols-[repeat(4,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn"
					>
						<AppGameNumberDraw
							v-for="draw in storeIncentive.inventory.choosePrizeDetails
								.drawnNumber[0].dozens"
							:key="draw"
							:numberDraw="draw.number"
							:status="draw.status"
						/>
					</div>
				</div>

				<!-- Informações para contato -->
				<div
					class="fm1 justify-center text-center mt-4 text-[10px] md:text-[14px]"
				>
					<p class="animate__animated animate__fadeInUp max-w-[400px]">
						{{ store.contentApp.sessions_subtitle_three }}
					</p>
				</div>

				<div class="animate__animated animate__zoomInUp mt-6">
					<div class="fm1 text-[10px] md:text-[14px]">
						<p>{{ store.contentApp.sessions_subtitle_four }}</p>
					</div>
					<div class="flex items-center justify-center mt-4">
						<UIcon
							name="i-mdi-whatsapp"
							class="text-3xl md:text-4xl lg:text-5xl"
						/>
						<p class="fm3 text-[20px] md:text-[24px]">
							{{ store.contentApp.config_text_phone_contact }}
						</p>
					</div>
				</div>
				<div class="mt-16 lg:mt-10 animate__animated animate__fadeIn">
					<p class="fm1 text-[8px] md:text-[10px]">
						{{ store.contentApp.sessions_subtitle_six }}
					</p>
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
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['auth-user', 'choose-prize-details'],
});

const textColor = computed(() => {
	return `color: ${app.colors_text_one}`;
});

const imgScratchCard = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_two}`;
});

const hasHeader = computed(() => {
	return {
		'pt-14': app.config_will_have_hotsite,
	};
});
</script>

<style scoped></style>
