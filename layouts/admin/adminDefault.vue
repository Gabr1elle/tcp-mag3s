<template>
	<div class="min-h-screen">
		<!-- Header -->
		<AdmHeader />

		<!-- Content Page -->
		<div class="min-h-svh">
			<NuxtPage :page-key="route => route.fullPath" />
		</div>

		<!-- Footer -->
		<AdmFooter />

	</div>

	<!-- Notifications -->
	<UNotifications />
</template>

<script setup></script>
