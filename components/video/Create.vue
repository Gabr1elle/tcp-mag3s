<template>
	<div class="relative" :class="isOpen ? 'col-span-4' : 'col-span-2'">
		<div class="absolute right-3 top-3 z-10">
			<UButton variant="solid" :icon="'i-heroicons-' + (isOpen ? 'minus' : 'plus')" @click="isOpen = !isOpen" />
		</div>
		<UCard class="alert" :class="invalid ? 'active' : ''">
			<div class="grid grid-cols-5 gap-5 ">
				<div :class="isOpen ? 'col-span-3' : 'hidden'" class="grid grid-cols-1 gap-4">
					<UForm>
						<UFormGroup label="Título">
							<UInput @input="validateFields" v-model="formData.title" icon="i-material-symbols-match-case" />
						</UFormGroup>
						<UFormGroup label="Descrição">
							<UTextarea @input="validateFields" v-model="formData.description" icon="i-material-symbols-description" />
						</UFormGroup>
						<div class="grid grid-cols-6 my-2">
							<div class="col-span-4">
								<UFormGroup label="Categoria">
								<VideoCategorySearch v-model="formData.category" />
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
							<UAccordion :items="items">
								<template #item>
									<div class="grid grid-cols-2 gap-4">
										<UFormGroup label="ID Vimeo">
											<UInput @input="validateFields" v-model="formData.id" icon="i-material-symbols-123" disabled />
										</UFormGroup>
										<UFormGroup label="Data de criação">
											<UInput @input="validateFields" v-model="formData.created_at" icon="i-heroicons-calendar" disabled />
										</UFormGroup>
										<UFormGroup label="Duração (s)">
											<UInput @input="validateFields" v-model="formData.duration" icon="i-heroicons-clock" disabled />
										</UFormGroup>
										<UFormGroup label="Visualizações">
											<UInput @input="validateFields" v-model="formData.views" icon="i-heroicons-eye" disabled />
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
const emit = defineEmits(['selectedCard'])
const isOpen = ref(false)
const invalid = ref(false)
const props = defineProps({
	video: Object
})

watch(isOpen, (opened) => {
	if (opened) {
		const valid = validateFields();
		formData.value.status_form = valid;
		console.log('invalid',invalid.value)
		emit('selectedCard', formData.value);
	}
});

function validateFields() {
	if (formData.value.title && formData.value.description && formData.value.embed && formData.value.duration && formData.value.views && formData.value.created_at && formData.value.id) {
		console.log('valid')
		invalid.value = false;
		return true;
	}
	console.log('invalid', formData.value)

	invalid.value = true;
	return false;
}

const items = [{
	label: 'Mais informações',
	icon: 'i-heroicons-information-circle',
	defaultOpen: false,
	content: ''
}]

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
.alert {
	background-color: inherit;
	&.active{
		animation: alertBackground 3s infinite alternate;
	}
}

@keyframes alertBackground {
  from {
    background-color: currentColor;
  }
  to {
    background-color: lightcoral;
  }
}
</style>
