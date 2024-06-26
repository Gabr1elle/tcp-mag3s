<template>
	<div class="relative" :class="isOpen ? 'col-span-4' : 'col-span-2'">
		<div class="absolute right-3 top-3 z-10">
			<UButton variant="solid" :icon="'i-heroicons-' + (isOpen ? 'minus' : 'plus')" @click="isOpen = !isOpen" />
		</div>
		<UCard>
			<div class="grid grid-cols-5 gap-5 ">
				<div :class="isOpen ? 'col-span-3' : 'hidden'" class="grid grid-cols-1 gap-4">
					<UForm>
						<UFormGroup label="Título">
							<UInput v-model="formData.title" icon="i-material-symbols-match-case" />
						</UFormGroup>
						<UFormGroup label="Descrição">
							<UTextarea v-model="formData.description" icon="i-material-symbols-description" />
						</UFormGroup>
						<div class="grid grid-cols-6 my-2">
							<div class="col-span-4">
								<UFormGroup label="Categoria">
									<USelectMenu v-model="labels" by="id" name="labels" :options="options" option-attribute="name" searchable-placeholder="Procurar categoria"
									searchable
										creatable>
										<template #search>
												Procurar
										</template>
										<template #option="{ option }" >
												<span class="truncate">{{ option.name }}</span>
										</template>
										<template #option-create="{ option }">
											<span class="flex-shrink-0">Nova categoria:</span>
											<span class="block truncate">{{ option.name }}</span>
										</template>
									</USelectMenu>
								</UFormGroup>
							</div>
							<div class="col-span-2 flex justify-center">
								<UFormGroup label="Status">
									<UToggle v-model="formData.status" />
								</UFormGroup>
							</div>
						</div>
						<UFormGroup label="Tags">
							<div class="overflow-x-scroll gap-4 justify-center no-scrollbar">
								<UBadge v-for="tag in props.video.tags" :key="tag.resource_key">{{ tag.name }}</UBadge>
							</div>
						</UFormGroup>
						<UFormGroup class="mt-3">
							<UAccordion :items="items" >
								<template #item>
									<div class="grid grid-cols-2 gap-4">
										<UFormGroup label="ID Vimeo">
											<UInput v-model="formData.id" icon="i-material-symbols-123" disabled />
										</UFormGroup>
										<UFormGroup label="Data de criação">
											<UInput v-model="formData.created_at" icon="i-heroicons-calendar" disabled />
										</UFormGroup>
										<UFormGroup label="Duração (s)">
											<UInput v-model="formData.duration" icon="i-heroicons-clock" disabled />
										</UFormGroup>
										<UFormGroup label="Visualizações">
											<UInput v-model="formData.views" icon="i-heroicons-eye" disabled />
										</UFormGroup>
									</div>
								</template>
							</UAccordion>
						</UFormGroup>
					</UForm>
				</div>
				<div :class="isOpen ? 'col-span-2' : 'col-span-5'">
					<span v-if="isOpen" class="flex justify-start mb-2">Visualização</span>
					<div class="relative min-h-40">
						<VideoEmbed :videos="props.video" />
					</div>
					<span v-if="!isOpen" class="flex justify-center mt-2">{{ props.video.name }}</span>
				</div>
			</div>
			<template #footer>
				<div class="grid grid-cols-2" v-if="isOpen">
					<div>
						<UButton label="Cancelar" icon="i-heroicons-stop-solid" color="red" @click="isOpen = false" />
					</div>
					<div class="flex justify-end">
						<UButton label="Adicionar" icon="i-heroicons-plus" @click="isOpen = true" />
					</div>
				</div>
			</template>
		</UCard>
	</div>
</template>

<script setup>

function deleteCategory(id) {
	const index = selected.value.findIndex((label) => label.id === id)

	if (index !== -1) {
		selected.value.splice(index, 1)
	}
}

const isOpen = ref(false)

const props = defineProps({
	video: Object
})

const items = [{
  label: 'Mais informações',

  icon: 'i-heroicons-information-circle',
  defaultOpen: false,
  content: ''
}]

const options = ref([
	{ id: 1, name: 'bug', color: 'd73a4a' },
	{ id: 2, name: 'documentation', color: '0075ca' },
	{ id: 3, name: 'duplicate', color: 'cfd3d7' },
	{ id: 4, name: 'enhancement', color: 'a2eeef' },
	{ id: 5, name: 'good first issue', color: '7057ff' },
	{ id: 6, name: 'help wanted', color: '008672' },
	{ id: 7, name: 'invalid', color: 'e4e669' },
	{ id: 8, name: 'question', color: 'd876e3' },
	{ id: 9, name: 'wontfix', color: 'ffffff' }
])

const selected = ref([])

const labels = computed({
	get: () => selected.value,
	set: async (labels) => {
		const promises = labels.map(async (label) => {
			if (label.id) {
				return label
			}

			const response = {
				id: options.value.length + 1,
				name: label.name,
			}

			options.value.push(response)

			return response
		})

		selected.value = await Promise.all(promises)
	}
})

const formData = ref({
	title: props.video.name,
	description: props.video.description,
	category: props.video.category,
	status: false,
	tags: props.video.tags,
	created_at: props.video.created_time,
	duration: props.video.duration,
	views: props.video.stats.plays,
	embed: props.video.links.embed,
	picture: props.video.pictures.base_link,
	id: props.video.id
})

</script>

<style lang="scss">
.no-scrollbar {
	-ms-overflow-style: none;
	/* IE and Edge */
	scrollbar-width: none;

	/* Firefox */
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
