<template>
	<AppLayoutBgDefault />
	<div v-show="!storeIncentive.loading" class="" :style="`color: ${store.contentApp.colors_text_one}`">

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="py-12" :class="hasHeader">
			<!-- Banner Principal -->
			<div v-if="storeIncentive.showDrawnNumbersToday" class="max-w-[700px] m-auto flex justify-center">
				<AppBannersCard linkSource="" :hasImageDetach="false" imageDetach=""
					:loading="storeIncentive.loadingChosenDrawFull" :title="storeIncentive.revealChosenDrawFull.fullDate"
					:subtitle="storeIncentive.revealChosenDrawFull.description" :countdown="false" :callToAction="false"
					:hasDescription="true" :description="store.descriptionRevealDrawPrize"
					:imageAward="storeIncentive.revealChosenDrawFull.image" />
			</div>
			<div>
				<div v-show="!storeIncentive.showDrawnNumbersToday" class="max-w-[700px] m-auto flex justify-center">
					<div @mouseenter="carouselPauseAutoPlay(false)" @mouseleave="carouselPauseAutoPlay(true)" class="w-full">
						<UCarousel :items="storeIncentive.listDrawsLatest" :ref="carouselSetup.autoPlay ? 'carouselRef' : ''" :ui="carouselSetup.ui" indicators arrows>

							<template #default="{ item }">
									<AppBannersCard :linkSource="`/app/revelar-premio/${item.id}`" :hasImageDetach="false" imageDetach=""
										:loading="storeIncentive.loadingChosenDrawFull" :title="store.titleCardNextDraw(item.date)"
										:subtitle="store.subtitleCardNextDraw(item.date)" :countdown="false"
										:callToAction="store.labelButtonCardNextDraw(item.date)" :hasDescription="false"
										:description="false" :imageAward="item.image" />
							</template>

							<template #indicator="{ onClick, page, active }">
								<div :class="active ? 'bullet-active' : 'bullet-outline'" class="cursor-pointer rounded-full min-w-2 min-h-2 lg:min-w-7 lg:min-h-1.5 justify-center" @click="onClick(page)"></div>
							</template>

							<template #prev="{ onClick, disabled }">
								<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-back-ios" variant="link" size="xl" :ui="{padding: {xl: 'px-12 py-12'}}" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
							</template>

							<template #next="{ onClick, disabled }">
								<UButton :disabled="disabled" @click="onClick" icon="i-ic-round-arrow-forward-ios" variant="link" size="xl" :ui="{padding: {xl: 'px-12 py-12'}}" :padded="true" :style="`color: ${bgCarouselPaginationActive}`" />
							</template>
						</UCarousel>
					</div>
				</div>
			</div>

			<!-- Pesquisa dos números da sorte -->
			<UContainer
				v-if="app.config_will_have_raffle && storeIncentive.hasLuckyNumbersUser && storeIncentive.loadingChosenDrawFull && !storeIncentive.showDrawnNumbersToday">
				<div class="mt-6 flex justify-center animate__animated animate__fadeIn">
					<AppOthersInputSearching inputPlaceholder="Encontre aqui seu número da sorte" hasMaskInput="['##']"
						@input="storeIncentive.luckyNumbersUser(store.searchingValue)" class="lg:w-1/3"
						:inputModeOption="'numeric'" />
				</div>
			</UContainer>

			<!-- Separador -->
			<div class="h-6"></div>

			<!-- Números do Sorteio Atual -->
			<div v-if="storeIncentive.showDrawnNumbersToday">
				<h1 class="mb-2 lg:mb-5 fm3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] lg:text-center">{{
					store.contentApp.sessions_title_one }}</h1>
				<div
					class="grid grid-cols-[repeat(4,40px)] md:grid-cols-[repeat(4,50px)] lg:grid-cols-[repeat(4,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn">
					<AppGameNumberDraw v-for="drawToday in storeIncentive.drawnNumbersToday" :numberDraw="drawToday.number"
						:status="drawToday.status" />
				</div>
				<!-- Separador de Números -->
				<hr class="my-5 w-full sm:w-1/3 xl:w-1/4 m-auto borderSep">
			</div>

			<!-- Feedback de pesquisa caso não possuir o número da sorte -->
			<div v-if="storeIncentive.hasLuckyNumbersUser && !storeIncentive.luckyNumbersUser(store.searchingValue).length"
				class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center text-center animate__animated animate__fadeIn">
				<Icon name="i-ic-baseline-warning" class="me-4 w-5 lg:w-8 h-5 lg:h-8" />
				<h2>Você não possui esse número da sorte!</h2>
			</div>

			<!-- Números da sorte do usuário -->
			<ul v-show="storeIncentive.hasLuckyNumbersUser"
				class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-5 md:gap-x-8 md:gap-y-6 lg:gap-x-20 animate__animated animate__fadeInLeft"
				ref="animateNumbersUser">
				<li v-for="dozensOfNumbers in storeIncentive.luckyNumbersUser(store.searchingValue)" :key="dozensOfNumbers.id">
					<ul
						class="grid grid-cols-[repeat(4,40px)] md:grid-cols-[repeat(4,50px)] lg:grid-cols-[repeat(4,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 md:gap-2 justify-center animate__animated animate__fadeIn">
						<AppGameNumberDraw v-for="(dozensNumbers, index) in dozensOfNumbers.dozens"
							:numberDraw="dozensNumbers.number" :status="dozensNumbers.status" :key="index" />
					</ul>
				</li>
			</ul>

			<!-- Feedback caso o usuário não possui números da sorte -->
			<div v-if="!storeIncentive.hasLuckyNumbersUser && storeIncentive.loadingChosenDrawFull"
				class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center mt-6 animate__animated animate__fadeInDown">
				<Icon name="i-ic-baseline-warning" class="me-4 w-5 lg:w-8 h-5 lg:h-8" />
				<h2>Você não possui números da sorte no momento!</h2>
			</div>

			<!-- Menu Behaviour -->
			<div v-if="storeIncentive.userLoggedIn" class="lg:mt-24">
				<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
				<div v-if="app.config_will_have_hotsite">
					<div
						:class="!storeIncentive.hasLuckyNumbersUser && storeIncentive.loadingChosenDrawFull ? 'mt-16 md:mt-36' : 'mt-12 md:mt-64'">
					</div>
					<AppLayoutMenuBehaviour />
					<div class="mt-16 md:mt-32"></div>
				</div>
			</div>

		</UContainer>

		<!-- Modal de interação do prêmio -->
		<AppGameModalPrize />
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user', 'reveal-chosen-draw']
});

const borderSept = store.contentApp.colors_border_two;

const [animateNumbersUser] = useAutoAnimate({
	duration: 1000
});

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite
	}
});

const bgCarouselPagination = computed(() => {
	return app.colors_carousel_pagination_background;
});

const bgCarouselPaginationActive = computed(() => {
	return app.colors_emphasis_active_and_hover;
});

// Carrossel de prêmios
const carouselRef = ref();
const carouselSetup = reactive({
	autoPlay: true,
	timer: 3500,
	ui: {
		item: 'basis-full',
		indicators: { wrapper: 'relative bottom-0 mt-4' },
		arrows: {
			wrapper: 'absolute top-1/2 transform -translate-y-1/2 w-full',
			next: 'right-0',
			prev: 'left-0'
		},
	},
});

const carouselPauseAutoPlay = (toggle) => {
	carouselSetup.autoPlay = toggle;
};


onNuxtReady(async () => {
	// Modal de revelar prêmio
	if (storeIncentive.showDrawnNumbersToday) {
		switch (storeIncentive.gamification.lotteryDraws.LuckyNumbersWereDrawn) {
			case true:
				store.openModalPrizeResult(
					store.contentApp.modal_text_prize_title_three,
					store.contentApp.modal_text_prize_subtitle_three,
					store.contentApp.modal_text_prize_label_three,
					'details');
				break;

			case false:
				store.openModalPrizeResult(
					store.contentApp.modal_text_prize_title_two,
					store.contentApp.modal_text_prize_subtitle_two,
					store.contentApp.modal_text_prize_label_two,
					'back');
				break;

			case null:
				setTimeout(() => {
					store.openModalPrizeResult(
						store.contentApp.modal_text_prize_title_one,
						store.contentApp.modal_text_prize_subtitle_one,
						store.contentApp.modal_text_prize_label_one,
						'reveal');
				}, 1000);
				break;
		}
	}

	// Buscando informações de sorteio caso o usuário estiver logado
	if (storeIncentive.userLoggedIn) {
		await storeIncentive.lotteryDraws(useToast);
	}

	// Menu Habilitado
	store.selectMenuBehaviour(4, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);

// Iniciando o carrossel de prêmios
	const startCarouselInterval = () => {
		return setInterval(() => {
			if (!carouselRef.value) return;

			if (carouselRef.value.page === carouselRef.value.pages) {
				return carouselRef.value.select(0);
			}

			carouselRef.value.next();
		}, carouselSetup.timer);
	};

	let carouselInterval = startCarouselInterval();

	const stopCarouselInterval = () => {
		clearInterval(carouselInterval);
	}

	const initCarouselInterval = () => {
		stopCarouselInterval();
		carouselInterval = startCarouselInterval();
	}

	initCarouselInterval();
});
</script>

<style>
.borderSep {
	border-color: v-bind(borderSept);
}

.bullet-outline {
	background-color: v-bind(bgCarouselPagination);
	opacity: .5;
}

.bullet-active {
	background-color: v-bind(bgCarouselPaginationActive);
}
</style>
