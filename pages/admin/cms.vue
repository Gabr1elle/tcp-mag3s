<template>
	<div>
		<!-- Fundo com Ícone e marca d'água -->
		<div
			class="fixed flex top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] -z-10 text-[500px] opacity-[4%] text-green-600">
			<UIcon name="i-material-symbols-perm-media" />
		</div>

		<!-- Conteúdo -->
		<UContainer>
			<!-- Menu Lateral -->
			<AdmAsideBar />

			<div v-if="doYouHaveMedia" class="py-24">
				<!-- Filtros -->
				<div class="mb-8 grid grid-cols-[minmax(200px,1fr)_auto_auto] gap-5">
					<div>
						<h2 class="mb-2 text-base font-semibold">Filtre por Tags:</h2>
						<div class="flex pb-2 overflow-x-auto">
							<AdmTag v-for="tag in store.tags" class="w-fit me-3 last:me-0" :tag="tag" />
						</div>
					</div>

					<div>
						<h2 class="mb-2 text-base font-semibold">Filtre por nome, conteúdo ou descrição:</h2>

						<UFormGroup class="block mb-2" name="type" size="xl">
							<UInput color="green" variant="outline" placeholder="Pesquise aqui..." v-model="store.searchingMedia"
								icon="i-heroicons-magnifying-glass-20-solid" @input="store.filteredMedias(store.searchingMedia)" />
						</UFormGroup>
					</div>

					<div>
						<h2 class="mb-2 text-base font-semibold">Filtre por Tipo de mídia:</h2>

						<UFormGroup class="block mb-2" name="type" size="xl">
							<USelectMenu id="type" name="type" option-attribute="name" v-model="store.filterPerTypeMedia"
								:options="store.typesMediaForm" value-attribute="value" placeholder="selecione aqui..."
								:trailing="false" icon="i-material-symbols-filter-alt" size="xl" @change="store.filteringTheMedia(
									store.filterPerTagChoise.id,
									store.filterPerTagChoise.name,
									store.filterPerTypeMedia,
									true
								);" />
						</UFormGroup>
					</div>
				</div>


				<!-- Lista das mídias cadastradas -->
				<div class="mb-8">
					<AdmMedias />
				</div>

				<!-- Botão para Adicionar  -->
				<AdmButtonNewMedia position="fixed" />
			</div>

			<AdmNoMedias v-else />

			<!-- Modal para preencher ou editar dados de uma mídia -->
			<AdmMediaModal />

			<!-- Modal para deletar uma mídia expecífica -->
			<AdmDeleteMediaModal />
		</UContainer>

	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

const doYouHaveMedia = computed(() => {
	return store.medias.length;
})

definePageMeta({
	layout: 'admin-default',
	middleware: ["auth-admin"]
})

await store.getContent(useToast);
</script>

<style scoped></style>
