<template>
	<NuxtPwaManifest />
	<div
		:class="
			isUserAdminLogIn ? 'lg:mt-[30px] animate__animated animate__fadeIn' : ''
		"
	>
		<NuxtPage :page-key="(route) => route.fullPath" />
		<OthersIndicatorAdmin />
	</div>

	<ClientOnly>
		PWA Installed: {{ $pwa?.isPWAInstalled }} <br />
		show prompt: {{ $pwa?.showInstallPrompt }} <br />
		ready: {{ $pwa?.offlineReady }}
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
      <div
        v-if="
          $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
        "
        class="pwa-toast"
        role="alert"
      >
        <div class="message">
          <span> Install PWA </span>
        </div>
        <button @click="$pwa.install()">Install</button>
        <button @click="$pwa.cancelInstall()">Cancel</button>
      </div>
    </ClientOnly>

	<UNotifications />
</template>

<script setup>
const isUserAdminLogIn = useCookie('idUser').value;
const { $pwa } = useNuxtApp();

const toast = useToast();

onMounted(() => {
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
