<template>
	<UContainer class="min-h-screen">
		<div class="py-24">

			<!-- Botão de voltar -->
			<AdmBackButton :links="[{
				label: 'Dashboard',
				icon: 'i-heroicons-home',
				to: '/admin/dashboard'
			}, {
				label: 'Blog',
				icon: 'i-material-symbols-post-add',
			}]" />

			<!-- Título e Descrição -->
			<h1 class="text-2xl font-semibold animate__animated animate__fadeInDown">Blog</h1>
			<p class="text-gray-500 animate__animated animate__fadeInUp">Gerencie as postagens do blog</p>

			<!-- Lista das postagens cadastradas -->
			<div>
				<AdmBlogPosts />
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const storeAdmin = useStoreAdmin();

definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
});

await storeAdmin.getPosts(useToast);
</script>

<style scoped></style>
