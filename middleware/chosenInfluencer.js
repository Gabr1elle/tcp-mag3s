import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);

	// Salvando o código do influencer em um cookie
	if (to.params.influencer) {
		const cookieInfluencer = useCookie('influencerCode', {
			maxAge: 86400,
			sameSite: true,
			httpOnly: false,
		});

		// Salva no cookie o código do influencer
		cookieInfluencer.value = to.params.influencer;

		if (process.client) {
			// Obtém as estatísticas do influencer
			await storeIncentive.getDataInfluencerOnly(
				useToast,
				to.params.influencer
			);
		}
	}

	// Exibe o influencer no hotsite
	storeApp.chosenInfluencer(to.params.influencer);

	return;
});
