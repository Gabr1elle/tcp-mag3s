<template>
	<div>
		<!-- Lista das postagens cadastradas -->
		<div v-if="store.hasPosts">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 animate__animated animate__fadeIn">
				<UCard v-for="post in store.blog.posts" :key="post.id" :post="post">
					<template #header>
						<h1 class="font-bold line-clamp-1">{{ post.title }}</h1>
						<p class="line-clamp-1">{{ post.content }}</p>
						<p class="flex">
							<span class="me-3">URL:</span>
							<NuxtLink :to="`/blog/${post.slug}`" variant="link" target="_blank"
								class="line-clamp-1 text-sky-500 hover:text-sky-700">/{{
								post.slug
								}}</NuxtLink>
						</p>
					</template>

					<div class="bg-slate-800 h-60 bg-cover bg-center" style="background-image: url('/imgs/bg_default.png')">
					</div>

					<template #footer>
						<div class="flex justify-between">
							<UButton variant="link" icon="i-material-symbols-edit" label="Editar" class="text-green-500" />
							<UButton variant="link" label="Deletar" icon="i-material-symbols-delete" class="text-red-500"
								@click.prevent="store.blog.isOpenModalDeletePost = !store.blog.isOpenModalDeletePost; store.blog.selectPostId = post.id" />
						</div>
					</template>
				</UCard>
			</div>

			<!-- Botão para adiconar nova postagem -->
			<AdmButtonNewPost position="justify-end" />
		</div>

		<!-- AdmNoPosts -->
		<div v-else>
			<AdmNoPosts />
		</div>

		<!-- Modal delete post  -->
		<UModal v-model="store.blog.isOpenModalDeletePost" prevent-close>
			<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							Tem certeza que deseja deletar esta postagem?*
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="store.blog.isOpenModalDeletePost = false" />
					</div>
				</template>

				<div>
					<p class="text-red-600 font-semibold">ID: {{ store.blog.selectPostId }}</p>
					<p class="text-red-600">Postagem: {{ store.titleBlogByPostId }}</p>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-5">
						*Esta ação não poderá ser desfeita.
					</p>
				</div>

				<template #footer>
					<div class="flex justify-end">
						<UButton color="red" variant="solid" label="Deletar" class="me-4"
							@click="store.deletePost(store.blog.selectPostId, useToast)" />
						<UButton color="gray" variant="ghost" label="Cancelar" @click="store.blog.isOpenModalDeletePost = false" />
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();
</script>

<style scoped></style>
