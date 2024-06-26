<template>
  <div>
    <UButton label="Adicionar" icon="i-heroicons-plus" @click="isOpen = true" :class="props.class"/>

    <UModal v-model="isOpen" fullscreen>
			<UCard>
				<template #header>
					<div class="grid grid-cols-12">
						<div class="col-span-11">
							<h1 class="text-2xl font-semibold">Adicionar Video</h1>
						</div>
						<div class="col-span-1 flex items-center justify-center">
							<UButton @click="isOpen = false" icon="i-heroicons-x-mark" />
						</div>
					</div>
				</template>
			</UCard>
      <div class="p-4">
				<VideoSearchAdmin />
      </div>
    </UModal>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const props = defineProps({
	class: {
		type: String,
		default: ''
	}
})
</script>

<style>

</style>
