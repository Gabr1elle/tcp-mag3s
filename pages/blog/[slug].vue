<template>
	<AppLayoutBgDefault />

	<!-- // Puxando post pela URL -->
	<UContainer class="mt-10">
		<div
			v-if="post"
			class="text-white py-14 grid items-center gap-2 lg:gap-3 auto-rows-auto"
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
				<!-- Conteúdo de comentários -->
				<div class="bg-black mt-14 grid-cols-2">
					<h1 class="uppercase text-gray-300">comentários</h1>
					<hr class="border-gray-300 border-opacity-50 my-2" />

					<div class="flex items-center justify-between py-5">
						<div class="flex items-center">
							<UAvatar size="sm" alt="Gabi Santos" />
							<p class="ml-2 font-extralight">@gabiSantos_2023:</p>
							<p class="ml-2">top, eu amei o conteúdo!</p>
						</div>
					</div>
				</div>
			</UCard>
		</div>
	</UContainer>
</template>


<script setup>
import { useStoreBlog } from '/stores/blog';

const post = ref();
const storeBlog = useStoreBlog();
post.value = storeBlog.blog.post;

definePageMeta({
	middleware: ['blog-post'],
});
</script>

<style scoped>
.bg-img {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
