<template>
	<AppLayoutBgDefault />
	<UContainer>
		<div
			v-if="storeBlog.hasPostsBlog"
			class="text-white py-14 grid items-center gap-2 lg:gap-3 auto-rows-auto"
		>
			<div v-for="post in posts" :key="post.id" class="mb-8 relative">
				<UCard class="bg-black">
					<NuxtLink :to="`/blog/${post.id}`">
						<div class="grid lg:grid-cols-3 gap-5 items-stretch">
							<!-- Imagem do post -->
							<div
								style="
									background-image: url('https://www.gr6metaverso.com/wp-content/uploads/2022/06/Group-37-1.png-1.webp');
								"
								class="bg-cover bg-no-repeat items-start rounded"
							></div>

							<div class="col-span-2">
								<!-- //Titulo dos posts -->
								<h1 class="text-4xl font-bold text-start text-dark py-5">
									{{ post.title }}
								</h1>

								<!-- //Subtítulo dos posts -->
								<p>{{ post.subtitle }}</p>

								<!-- //Conteúdo do post -->
								<p class="text-lg py-4">{{ post.content }}</p>

								<!-- // Data de publicação -->
								<div class="absolute top-0 right-0 py-3 px-3">
									{{ post.createdAtFull }}
								</div>

								<div class="flex justify-end items-center gap-3">
									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-eye" />
										{{ post.views }}
									</button>

									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-heart" />
										{{ post.likeCount }}
									</button>

									<button class="flex gap-1 items-center">
										<UIcon name="i-heroicons-chat-bubble-left" />
									</button>
								</div>
							</div>
						</div>
					</NuxtLink>
				</UCard>
			</div>
		</div>
		<div v-else class="text-white py-14 text-center">
			<p>Nenhum post encontrado.</p>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreBlog } from '/stores/blog';

const posts = ref();
const storeBlog = useStoreBlog();

definePageMeta({
	middleware: ['blog-post'],
});

onNuxtReady(async () => {
	await storeBlog.getPostsBlog();
	posts.value = storeBlog.blog.posts;
});
</script>

<style scoped></style>