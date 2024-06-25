<template>
	<!-- background default -->
	<AppLayoutBgDefault />

	<!-- Header -->
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<!-- Conteúdo -->
	<UContainer class="min-h-screen lg:pt-6">
		<!-- Posts -->
		<div v-if="!storeBlog.blog.loading"
			class="text-white py-16 lg:py-20 grid items-center gap-10 lg:gap-6 auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate__animated animate__fadeIn">
			<div v-if="storeBlog.hasPostsBlog" v-for="post in storeBlog.blog.posts" :key="post.id" class="relative">
				<UCard class="bg-black" :ui="{ body: { base: '', background: '', padding: 'px-6 py-6 sm:p-6' } }">
					<NuxtLink :to="`/blog/${post.slug}`">
						<div class="grid grid-cols-1 gap-y-5 lg:gap-y-0 items-stretch">

							<!-- Container Mídias de destaque -->
							<div>
								<!-- Imagem destaque -->
								<div class="col-span-1 bg-cover bg-no-repeat bg-center items-start rounded min-h-[320px] w-full"
									:style="`background-image: url(${post.image})`">
								</div>

								<!-- Video destaque -->

								<!-- Placeholder destaque -->

							</div>

							<div class="col-span-2 mt-6">
								<!-- Data de publicação -->
								<div class="text-gray-300 opacity-60 text-xs lg:text-sm mb-2">
									{{ post.createdAtFull }}
								</div>

								<!-- Titulo dos posts -->
								<h1 class="text-4xl font-bold text-start text-dark mb-2">
									{{ post.title }}
								</h1>

								<!-- Subtítulo dos posts -->
								<p class="mb-4">{{ post.subtitle }}</p>

								<!-- Conteúdo do post -->
								<p class="text-lg my-4 line-clamp" v-html="post.content"></p>

								<div class="flex justify-end items-center gap-3">
									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-eye" />
										{{ post.views }}
									</button>

									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-heart" />
										{{ post.likeCount }}
									</button>
								</div>
							</div>
						</div>
					</NuxtLink>
				</UCard>
			</div>
			<div v-else class="text-white py-14 text-center">
				<p>Nenhum post encontrado.</p>
			</div>
		</div>

		<div v-else class="flex flex-col justify-center items-center h-screen">
			<AppOthersSpin />
			<p class="text-white mt-2">Carregando os Posts, aguarde...</p>
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

<style scoped>
.line-clamp {
	-webkit-line-clamp: 4;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
