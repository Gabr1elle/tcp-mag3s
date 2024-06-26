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
			}]" />

			<!-- Título e Descrição -->
			<h1 class="text-2xl font-semibold animate__animated animate__fadeInDown">Videos</h1>
			<p class="text-gray-500 animate__animated animate__fadeInUp">Gerencie os videos apresentados na plataforma</p>
			<div class="flex gap-4 my-2">
				<ULink to="/admin/videos/categorias">
					<div class="rounded px-4 py-2 bg-purple-500 hover:bg-purple-600 transition-all text-white">
						<div class="flex items-center">
							<UIcon class="w-5 h-5 me-4 text-indigo-100" name="i-material-symbols-category" />
							<div>
								<span class="text-lg font-bold">Categorias</span>
							</div>
						</div>
					</div>
				</ULink>
				<ULink to="/admin/videos/tags">
					<div class="rounded px-4 py-2 bg-purple-500 hover:bg-purple-600 transition-all text-white">
						<div class="flex items-center">
							<UIcon class="w-5 h-5 me-4 text-indigo-100" name="i-material-symbols-shoppingmode" />
							<div>
								<span class="text-lg font-bold">Tags</span>
							</div>
						</div>
					</div>
				</ULink>
			</div>
			<div>
				<AdmNoVideos />
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const storeAdmin = useStoreAdmin();

useHead({
	title: 'Administrativo - vídeos',
	description: 'Gerencie os videos apresentados na plataforma',
});

definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
});

// await storeAdmin.getPosts(useToast);

</script>

<style scoped></style>
