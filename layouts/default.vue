<template>
	<div
		:class="
			isUserAdminLogIn ? 'lg:mt-[30px] animate__animated animate__fadeIn' : ''
		"
	>
		<NuxtPage :page-key="(route) => route.fullPath" />
		<OthersIndicatorAdmin />
	</div>

	<ClientOnly>
		<div class="text-white fixed top-[50%]">
			PWA Installed: {{ $pwa?.isPWAInstalled }} <br />
			show prompt: {{ $pwa?.showInstallPrompt }} <br />
			ready: {{ $pwa?.offlineReady }}
		</div>
	</ClientOnly>

	<!-- You can use $pwa directly in templates! -->
	<ClientOnly>
		<div
			v-if="$pwa?.offlineReady || $pwa?.needRefresh"
			class="pwa-toast"
			role="alert"
		>
			<div class="message">
				<span v-if="$pwa.offlineReady"> App ready to work offline </span>
				<span v-else>
					New content available, click on reload button to update.
				</span>
			</div>
			<button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()">
				Reload
			</button>
			<button @click="$pwa.cancelPrompt()">Close</button>
		</div>
	</ClientOnly>

	<UNotifications />
</template>

<script setup>
const isUserAdminLogIn = useCookie('idUser').value;
const { $pwa } = useNuxtApp();

const toast = useToast();

const actions = ref([
	{
		label: 'Install',
		click: () => $pwa.install(),
	},
	{
		label: 'Cancel',
		click: () => $pwa.cancelInstall(),
	},
]);

watchEffect(() => {
	if ($pwa?.showInstallPrompt && !$pwa?.needRefresh) {
		toast.add({
			title: 'Install PWA',
			description: 'Install this app on your device for a better experience',
			timeout: 0,
			closeButton: false,
			actions,
		});
	}
});
</script>

<style>
.pwa-toast {
	position: fixed;
	right: 0;
	bottom: 0;
	margin: 16px;
	padding: 12px;
	border: 1px solid #8885;
	border-radius: 4px;
	z-index: 9999;
	text-align: left;
	box-shadow: 3px 4px 5px 0 #8885;
}

.pwa-toast .message {
	margin-bottom: 8px;
}

.pwa-toast button {
	border: 1px solid #8885;
	outline: none;
	margin-right: 5px;
	border-radius: 2px;
	padding: 3px 10px;
}
</style>
