<template>
	<div>
		<!-- Lista das postagens cadastradas -->
		<div v-if="storeBlog.hasPosts">
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate__animated animate__fadeIn">
				<UCard v-for="post in storeBlog.posts" :key="post.id" :post="post">
					<template #header>
						<h1 class="font-bold">{{ post.title }}</h1>
						<p class="line-clamp-1">{{ post.content }}</p>
						URL: <UButton :to="`/blog/${post.slug}`" variant="link" target="_blank">/{{ post.slug }}</UButton>
					</template>

					<div class="bg-slate-800 h-60 bg-cover bg-center" style="background-image: url('/imgs/bg_default.png')">
					</div>

					<template #footer>
						<div class="flex justify-between">
							<UButton variant="link" icon="i-material-symbols-edit" label="Editar" class="text-green-500" />
							<UButton variant="link" label="Deletar" icon="i-material-symbols-delete" class="text-red-500"
								@click.prevent="storeBlog.isOpenModalDeletePost = !storeBlog.isOpenModalDeletePost" />
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
		<UModal v-model="storeBlog.isOpenModalDeletePost" prevent-close>
			<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							Tem certeza que deseja deletar esta postagem?*
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="storeBlog.isOpenModalDeletePost = false" />
					</div>
				</template>

				<div>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						*Esta ação não poderá ser desfeita.
					</p>
				</div>

				<template #footer>
					<div class="flex justify-end">
						<UButton color="red" variant="solid" label="Deletar" class="me-4" />
						<UButton color="gray" variant="ghost" label="Cancelar"
							@click="storeBlog.isOpenModalDeletePost = false" />
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreBlog } from '~/stores/blog';
const storeBlog = useStoreBlog();

</script>

<style scoped></style>
