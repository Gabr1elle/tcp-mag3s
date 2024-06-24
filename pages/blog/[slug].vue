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
		background="('https://www.gr6metaverso.com/wp-content/uploads/2022/06/Group-37-1.png-1.webp')"
		:imageDetach="false"
		loading="false"
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
					<div
						style="
							background-image: url('https://www.gr6metaverso.com/wp-content/uploads/2022/06/Group-37-1.png-1.webp');
						"
						class="bg-img rounded"
					></div>

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

						<div class="flex justify-end items-center gap-3">
							<UButton variant="ghost" class="flex gap-1 items-center">
								<UIcon name="i-heroicons-eye" />
								{{ post.views }}
							</UButton>

							<UButton variant="ghost" class="flex gap-1 items-center">
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
						<div class="relative">
							<button
								@click="toggleMenu(comment.id)"
								class="p-2 text-gray-500 hover:text-white"
							>
								<!-- ícone de três pontos para excluir o cometário -->
							</button>
							<div
								v-if="comment.showMenu"
								class="absolute right-0 mt-2 w-48 bg-neutral-500 text-white rounded-lg shadow-lg items-center"
							>
								<ul>
									<li
										@click="deleteComment(comment.id)"
										class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
									>
										Excluir
									</li>
								</ul>
							</div>
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

const newComment = ref({
	nickname: '', // Aqui você pode colocar o nickname do usuário
	content: '',
});

const toggleMenu = (commentId) => {
	post.value.comments = post.value.comments.map((comment) => {
		if (comment.id === commentId) {
			comment.showMenu = !comment.showMenu;
		} else {
			comment.showMenu = false;
		}
		return comment;
	});
};

const addComment = async () => {
	if (newComment.value.trim()) {
		// Verifica se há conteúdo no novo comentário
		try {
			// Persiste o novo comentário no servidor
			await storeBlog.newComment(post.value.id, newComment.value);

			// Adiciona o novo comentário ao post
			const comment = {
				id: Date.now(),
				user: storeBlog.post.comments.userComents.nickname,
				content: newComment.value.content, // Garante que apenas o conteúdo do comentário seja enviado
				showMenu: false,
			};
			post.value.comments.push(comment);

			// Limpa o campo de novo comentário
			newComment.value.content = '';
		} catch (error) {
			console.error(error);
		}
	}
};

const deleteComment = (commentId) => {
	post.value.comments = post.value.comments.filter(
		(comment) => comment.id !== commentId
	);
};

const showFullBanner = ref(false);
definePageMeta({
	middleware: ['blog-post', 'auth-user'],
});

onNuxtReady(() => {
	if (window.innerWidth < 768) {
		showFullBanner.value = true;
	}
});
onMounted(async () => {
	try {
		// Busca os comentários do servidor
		const comments = await storeBlog.getComments(post.value.id);

		// Adiciona os comentários ao post
		post.value.comments = comments;
	} catch (error) {
		console.error(error);
	}
});
</script>

<style scoped>
.bg-img {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
