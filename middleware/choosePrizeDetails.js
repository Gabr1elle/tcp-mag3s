import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);

	if(process.server) return;

	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
	storeIncentive.prizeDetails(to.params.id);
	return;
});
