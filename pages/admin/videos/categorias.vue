<template>
	<UContainer class="min-h-screen">
		<div class="py-24">

			<!-- Botão de voltar -->
			<AdmBackButton :links="[{
				label: 'Dashboard',
				icon: 'i-heroicons-home',
				to: '/admin/dashboard'
			}, {
				label: 'Videos',
				icon: 'i-material-symbols-movie',
				to: '/admin/videos'
			}, {
				label: 'Categoria',
				icon: 'i-material-symbols-category',
			}]" />

			<!-- Título e Descrição -->
			<h1 class="text-2xl font-semibold animate__animated animate__fadeInDown">Categorias</h1>
			<p class="text-gray-500 animate__animated animate__fadeInUp">Gerencie as categorias dos vídeos da plataforma</p>
			<div>
				Teste Categorias
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const storeAdmin = useStoreAdmin();

useHead({
	title: 'Vídeos - Categorias'
});

definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
});

// await storeAdmin.getPosts(useToast);

</script>

<style scoped></style>
