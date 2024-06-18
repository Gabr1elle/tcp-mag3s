<template>
<div class="flex justify-start mb-5 animate__animated animate__fadeInDown">
	<UBreadcrumb :links="props.links" :ui="{ ol: 'gap-x-3', li: 'gap-x-3' }">
		<template #divider>
			<span class="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
		</template>
	</UBreadcrumb>
</div>
</template>

<script setup>
const props = defineProps(['links']);
</script>

<style scoped></style>
