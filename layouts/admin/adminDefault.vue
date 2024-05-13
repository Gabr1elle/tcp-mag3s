<template>
	<div>
		<NuxtPage :page-key="route => route.fullPath" />
	</div>
	<UNotifications />
</template>

<script setup></script>
