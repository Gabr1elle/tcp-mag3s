<template class="bg-black">
	<AppLayoutBgDefault />
	<UContainer class="mt-10">
		<div
			v-if="post"
			class="text-white py-14 grid items-center gap-2 lg:gap-3 auto-rows-auto"
		>
			<h1 class="text-4xl font-bold text-start text-dark">{{ post.title }}

			</h1>
			<p>{{ post.subtitle }}

			</p>
			<p class="text-lg py-4">{{ post.content }}
			</p>
			<div>{{ post.image }}
			</div>
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

<style scoped></style>
