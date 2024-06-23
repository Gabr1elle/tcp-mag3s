<template>
	<div class="fixed w-full z-50">
		<div class="bg-zinc-700 py-2">
			<UContainer class="flex justify-between items-center">
				<ULink to="/admin/dashboard">
					<img width="40" src="/imgs/mag3s_dark.svg" alt="" srcset="">
				</ULink>
				<div>
					<UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
						<UAvatar src="" icon="i-material-symbols-account-circle-full" alt="Avatar" class="cursor-pointer" />
					</UDropdown>
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

const router = useRouter();
const cookieAuth = useCookie('idUser');
const items = [
	[
		{
			label: 'Sair',
			icon: 'i-material-symbols-logout-rounded',
			click: () => {
				// Logout
				cookieAuth.value = null;
				router.push({ path: '/admin/login' });
				store.logout = true;
			}
		},
	]
]
</script>

<style scoped></style>
