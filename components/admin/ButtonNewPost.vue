<template>
	<!-- botão violet escrito: criar nova postagem, com ícone e link para acessar a tela de criação de postagem -->
	<div class="flex" :class="[position, mt]">
		<UButton color="indigo" valiant="solid" size="xl" icon="i-material-symbols-note-stack-add-outline" label=" Nova
		Postagem" to="/admin/blog/newpost" trailing class="animate__animated animate__zoomIn">
		</UButton>
	</div>
</template>

<script setup>
	const props = defineProps({
		position: {
			type: String,
			default: 'justify-end'
		},
		mt: {
			type: String,
			default: 'mt-8'
		}
	});
</script>

<style scoped></style>
