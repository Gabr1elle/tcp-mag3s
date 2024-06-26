<template>
	<div>
		<USelectMenu v-model="labels" by="id" name="labels" :options="options" option-attribute="name"
			searchable-placeholder="Procurar categoria" searchable creatable>
			<template #search>
				Procurar
			</template>
			<template #option="{ option }">
				<span class="truncate">{{ option.name }}</span>
			</template>
			<template #option-create="{ option }">
				<span class="flex-shrink-0">Nova categoria:</span>
				<span class="block truncate">{{ option.name }}</span>
			</template>
		</USelectMenu>
	</div>
</template>

<script setup>


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

const selected = ref([])
</script>

<style></style>
