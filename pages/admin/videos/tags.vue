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
				label: 'Tags',
				icon: 'i-material-symbols-shoppingmode',
			}]" />

			<!-- Título e Descrição -->
			<h1 class="text-2xl font-semibold animate__animated animate__fadeInDown">Tags</h1>
			<p class="text-gray-500 animate__animated animate__fadeInUp">Gerencie as tags dos vídeos da plataforma</p>
			<div>
				Teste Tags
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const storeAdmin = useStoreAdmin();

useHead({
	title: 'Vídeos - Tags'
});

definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
});

// await storeAdmin.getPosts(useToast);

</script>

<style scoped></style>
