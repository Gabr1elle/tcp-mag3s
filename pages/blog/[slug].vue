<template>
	<!-- background default -->
	<AppLayoutBgDefault />

	<!-- Header -->
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<!-- Conteúdo -->
	<UContainer class="min-h-screen lg:pt-6">
		<!-- Post -->
		<div v-if="!storeBlog.blog.loading"
			class="text-white py-16 lg:py-20 grid items-center gap-2 lg:gap-3 auto-rows-auto">
			<UCard class="bg-black" :ui="{ body: { base: '', background: '', padding: 'px-6 py-6 sm:p-6' } }">
				<div class=" grid grid-cols-1 gap-y-5 items-stretch">
					<!-- Container Mídias de destaque -->
					<div>
						<!-- Imagem destaque -->
						<div class="col-span-1 bg-cover bg-no-repeat bg-center items-start rounded min-h-[420px] w-full"
							:style="`background-image: url(${storeBlog.blog.post.image})`">
						</div>

						<!-- Video destaque -->

						<!-- Placeholder destaque -->

					</div>

					<div class="col-span-2">
						<!-- Data de publicação -->
						<div class="text-gray-300 opacity-60 text-xs lg:text-sm mb-2">
							{{ storeBlog.blog.post.createdAt }}
						</div>

						<!-- //Titulo dos post -->
						<h1 class="text-4xl font-bold text-start text-dark mb-2">
							{{ storeBlog.blog.post.title }}
						</h1>

						<!-- //Subtítulo dos post -->
						<p class="mb-4">{{ storeBlog.blog.post.subtitle }}</p>

						<!-- //Conteúdo do post -->
						<p class="text-lg py-4">{{ storeBlog.blog.post.content }}</p>

						<!-- Likes -->
						<div class="flex justify-end items-center gap-3">
							<UButton variant="ghost" class="flex gap-1 items-center">
								<UIcon name="i-heroicons-eye" />
								{{ storeBlog.blog.post.views }}
							</UButton>
							<UButton variant="" class="flex gap-1 items-center" :class="{ 'text-red-500': storeBlog.blog.post.liked }"
								@click="onLike">
								<UIcon name="i-heroicons-heart" />
								{{ storeBlog.blog.post.likeCount }}
							</UButton>

							<UButton variant="ghost" class="flex gap-1 items-center">
								<UIcon name="i-heroicons-chat-bubble-left" />
							</UButton>
						</div>
					</div>
				</div>

				<!-- Conteúdo de comentários -->
				<div class="bg-black mt-14">
					<h1 class="uppercase text-gray-300">Comentários</h1>
					<hr class="border-gray-300 border-opacity-50 my-2" />

					<!-- Campo de novo comentário -->
					<UForm @submit="addComment" class="flex items-center py-5">
						<UAvatar size="lg" alt="Usuário" />
						<UInput v-model="newComment" type="text" placeholder="Escreva um comentário..."
							class="ml-2 p-2 w-full text-white bg-transparent rounded-lg" />
						<UButton type="submit" class="ml-2 p-2 bg-transparent text-white rounded">
							Comentar
						</UButton>
					</UForm>

					<!-- Lista de comentários -->
					<div v-for="comment in storeBlog.blog.post.comments" :key="comment.id"
						class="flex items-center justify-between py-5 relative">
						<div class="flex items-center">
							<UAvatar size="sm" :alt="comment.UserComents.nickname" />
							<p class="ml-2 font-extralight">
								{{ comment.UserComents.nickname }}:
							</p>
							<p class="ml-2">{{ comment.content }}</p>
						</div>
					</div>
				</div>
			</UCard>
		</div>

		<div v-else class="flex flex-col justify-center items-center h-screen">
			<AppOthersSpin />
			<p class="text-white mt-2">Carregando o Post, aguarde...</p>
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

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

const storeBlog = useStoreBlog();

definePageMeta({
	middleware: ['blog-post'],
});

onNuxtReady(async () => {
	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style scoped></style>
