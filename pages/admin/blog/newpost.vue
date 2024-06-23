<template>
	<UContainer class="min-h-screen">
		<div class="py-24">
			<h1>Nova Postagem</h1>
			<p>Crie abaixo uma nova postagem:</p>
			<div>
				<UForm>
					<div>
						<label for="title">Title</label>
						<input type="text" id="title" name="title" />
					</div>
					<div>
						<label for="content">Content</label>
						<textarea id="content" name="content"></textarea>
					</div>
					<div>
						<button type="submit">Save</button>
					</div>
				</UForm>
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
