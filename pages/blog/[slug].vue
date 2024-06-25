<template>
	<AppLayoutBgDefault />
	<AppLayoutHeader
		v-if="app.config_will_have_hotsite"
		:hasLogout="false"
		:bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app"
		:isLogoDark="true"
	/>

	<AppBannersCardFull
		v-if="showFullBanner"
		linkSource=""
		:hasImageDetach="false"
		:background="storeBlog.blog.post.image"
		:imageDetach="false"
		:loading="false"
		:title="storeBlog.blog.post.title"
		subtitle=""
		countdown=""
		callToAction=""
		:hasDescription="false"
		:description="false"
		imageAward=""
	/>

	<!-- // Puxando post pela URL -->
	<UContainer class="mt-10">
		<div
			v-if="post"
			class="text-white lg:py-24 grid items-center gap-2 lg:gap-3 auto-rows-auto"
		>
			<!-- Posts -->
			<UCard class="bg-black">
				<div class="grid lg:grid-cols-3 gap-5 items-stretch">
					<!-- Imagem do post -->
					<div class="bg-img rounded">{{ post.image }}</div>

					<div class="col-span-2">
						<!-- //Titulo dos post -->
						<h1 class="text-4xl font-bold text-start text-dark py-5">
							{{ post.title }}
						</h1>

						<!-- //Subtítulo dos post -->
						<p>{{ post.subtitle }}</p>

						<!-- //Conteúdo do post -->
						<p class="text-lg py-4">{{ post.content }}</p>

						<!-- // Data de publicação -->
						<div class="absolute top-0 right-0 py-3 px-3">
							{{ post.createdAtFull }}
						</div>

						<!-- Likes -->
						<div class="flex justify-end items-center gap-3">
							<UButton variant="ghost" class="flex gap-1 items-center">
								<UIcon name="i-heroicons-eye" />
								{{ post.views }}
							</UButton>
							<UButton
								variant=""
								class="flex gap-1 items-center"
								:class="{ 'text-red-500': post.liked }"
								@click="onLike"
							>
								<UIcon name="i-heroicons-heart" />
								{{ post.likeCount }}
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
						<UInput
							v-model="newComment"
							type="text"
							placeholder="Escreva um comentário..."
							class="ml-2 p-2 w-full text-white bg-transparent rounded-lg"
						/>
						<UButton
							type="submit"
							class="ml-2 p-2 bg-transparent text-white rounded"
						>
							Comentar
						</UButton>
					</UForm>

					<!-- Lista de comentários -->
					<div
						v-for="comment in storeBlog.blog.post.comments"
						:key="comment.id"
						class="flex items-center justify-between py-5 relative"
					>
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

const post = ref();
const storeBlog = useStoreBlog();
post.value = storeBlog.blog.post;

definePageMeta({
	middleware: ['blog-post', 'auth-user'],
});
</script>

<style scoped>
.bg-img {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
