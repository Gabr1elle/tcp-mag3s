<template>
	<!-- background default -->
	<AppLayoutBgDefault />

	<!-- Header -->
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<!-- Conteúdo -->
	<UContainer class="min-h-screen lg:pt-6">
		<!-- Posts -->
		<div v-if="!storeBlog.blog.loading" class="text-white py-16 lg:py-20 animate__animated animate__fadeIn">

			<!-- Breadcump -->
			<div class="mb-6 flex justify-center lg:justify-start">
				<UBreadcrumb :links="links" :ui="configBread">
					<template #divider>
						<span class="w-2 md:w-6 h-1 mx-3 rounded-full bg-gray-400 dark:bg-gray-300" />
					</template>
				</UBreadcrumb>
			</div>

			<div class="flex flex-wrap gap-10 md:gap-6">
				<div v-if="storeBlog.hasPostsBlog" v-for="post in storeBlog.blog.posts" :key="post.id" class="grow w-[350px]">
					<UCard :ui="configCard">
						<div class="grid grid-cols-1 gap-y-5 lg:gap-y-0 items-stretch justify-between h-full">
							<!-- Container Mídias de destaque -->
							<div>
								<!-- Imagem destaque -->
								<div v-if="post.image"
									class="col-span-1 bg-cover bg-no-repeat bg-center items-start rounded h-[320px] w-full rounded-2xl"
									:style="`background-image: url(${post.image})`">
								</div>

								<!-- Video destaque -->
								<div v-else-if="post.video"
									class="col-span-1 bg-cover bg-no-repeat bg-center items-start rounded h-[320px] w-full">
									<video class="object-cover object-center h-full w-full rounded-2xl" autoplay muted loop playsinline>
										<source :src="post.video" type="video/mp4">
									</video>
								</div>

								<!-- Se não há imagem nem vídeo, mostra o placeholder -->
								<div v-else
									class="col-span-1 bg-cover bg-no-repeat bg-center items-start rounded h-[320px] w-full bg-black">
								</div>

								<!-- Textos e conteúdos -->
								<div class="col-span-2 mt-6">
									<div class="flex justify-between">
										<!-- Data de publicação -->
										<div class="text-gray-300 opacity-60 text-xs lg:text-sm mb-2">
											{{ post.createdAtFull }}
										</div>

										<!-- Badge de categorias -->
										<div class="text-xs lg:text-sm mb-2">
											<UBadge color="red" variant="solid">{{ post.category }}</UBadge>
										</div>
									</div>

									<!-- Titulo dos posts -->
									<h1 class="text-4xl font-bold text-start text-dark mb-2 line-clamp-1">
										{{ post.title }}
									</h1>

									<!-- Subtítulo dos posts -->
									<p class="mb-4 line-clamp-1">{{ post.subtitle }}</p>

									<!-- Conteúdo do post -->
									<p class="text-lg my-4 line-clamp-3" v-html="post.content"></p>
								</div>
							</div>

							<!-- Badges de curtidas e comentários / Botão leia mais -->
							<div class="flex flex-col justify-end">
								<div class="flex justify-end items-center gap-3">
									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-eye" />
										{{ formatNumber(post.views) }}
									</button>

									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-heart" />
										{{ formatNumber(post.likeCount) }}
									</button>
								</div>

								<div class="flex justify-end items-end mt-3">
									<div>
										<NuxtLink :to="`/blog/${post.slug}`">
											<p class="text-red-400 hover:text-red-500 text-xl">continue lendo...</p>
										</NuxtLink>
									</div>
								</div>
							</div>
						</div>
					</UCard>
				</div>
				<div v-else class="text-white py-14 text-center">
					<p>Nenhum post encontrado.</p>
				</div>
			</div>
		</div>
		
		<div v-else class="flex flex-col justify-center items-center h-screen">
			<AppOthersSpin />
			<p class="text-white mt-2">Carregando os Posts, aguarde...</p>
		</div>

				<!-- Paginação -->
			<div class="flex justify-center items-center py-20">
				<UPagination v-model="page" :page-count="5" :total="items.length" size="lg"/>
			</div>

		<!-- Menu Behaviour -->
		<div v-if="storeIncentive.userLoggedIn">
			<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
			<div v-if="app.config_will_have_hotsite">
				<AppLayoutMenuBehaviour />
				<div class="mt-12 md:mt-32"></div>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreBlog } from '/stores/blog';
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

definePageMeta({
	middleware: ['blog-post'],
});

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();
const storeBlog = useStoreBlog();

const configCard = ref({
	base: 'h-full',
	background: 'bg-zinc-900',
	rounded: 'rounded-2xl',
	body: { base: 'h-full', background: '', padding: 'px-6 py-6 sm:p-6' }
});

// Paginação
const page = ref(1);
const items = ref(storeBlog.blog.posts);


const configBread = ref({
	li: 'text-red-100', inactive: 'hover:text-red-400',
	active: 'text-red-500 dark:text-red-400'
});

const links = [{
	label: 'Hub',
	icon: 'i-heroicons-home',
	to: '/app/hub'
}, {
	label: 'Central de Notícias',
	icon: 'i-heroicons-square-3-stack-3d',
	to: '/blog'
}]

onNuxtReady(async () => {
	await storeBlog.getPostsBlog();

	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style scoped></style>
