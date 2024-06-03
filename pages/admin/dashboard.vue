<template>
	<UContainer class="min-h-screen">
		<div class="py-24">
			<h1 class="text-2xl font-semibold animate__animated animate__fadeInDown">Dashboard</h1>
			<p class="text-gray-500 animate__animated animate__fadeInUp">Bem-vindo ao painel de controle</p>
			<!-- Crie abaixo dois card clicáveis com ícones e descrição, 1 para acessar o cms e outro o blog -->
			<div class="grid grid-cols-2 gap-8 pt-8 animate__animated animate__fadeIn">
				<ULink to="/admin/cms">
					<UCard class="bg-green-400 hover:bg-green-500 transition-all text-white">
						<div class="flex items-center">
							<UIcon class="w-10 h-10 me-4 text-green-100" name="i-material-symbols-media-link-rounded" />
							<div>
								<h2 class="text-lg font-bold">CMS</h2>
								<UCardDescription class="text-base">Gerencie as mídias do site</UCardDescription>
							</div>
						</div>
					</UCard>
				</ULink>

				<ULink to="/admin/blog">
					<UCard class="bg-indigo-500 hover:bg-indigo-600 transition-all text-white">
						<div class="flex items-center">
							<UIcon class="w-10 h-10 me-4 text-indigo-100" name="i-material-symbols-breaking-news-rounded" />
							<div>
								<h2 class="text-lg font-bold">Blog</h2>
								<UCardDescription class="text-base">Gerencie as postagens do blog</UCardDescription>
							</div>
						</div>
					</UCard>
				</ULink>
			</div>
		</div>

	</UContainer>
</template>

<script setup>
definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
})
</script>

<style scoped></style>
