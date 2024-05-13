<template>
	<div>
		<!-- Infos e status do conteúúdo -->
		<div class="flex items-center justify-between">
			<h2 class="mb-2 text-lg font-bold">Mídias Cadastradas:</h2>
			<div class="flex justify-end items-center">
				<h3 class="text-end uppercase me-4 relative cursor-default">
					<UBadge :ui="{ rounded: 'rounded-full' }" size="xs" color="red"
						:label="store.totalMidiasNoValue + ' Mídias sem valor'" class="font-bold" />
					<div v-if="store.totalMidiasNoValue"
						class="absolute -top-1 -right-2 h-3 w-3 rounded-full bg-red-600 animate-ping border"></div>
				</h3>
				<h3 class="text-end uppercase me-4 cursor-default">
					<UBadge :ui="{ rounded: 'rounded-full' }" size="xs" color="green"
						:label="store.totalMidias + ' Mídias cadastradas'" class="font-bold" />
				</h3>

				<UTooltip class="cursor-pointer" text="Mude a disposição das mídias no layout"
					:popper="{ placement: 'top-start' }">
					<div class="cursor-pointer w-6 h-6 text-green-500 hover:text-green-800" @click="typeLayout = !typeLayout">
						<UIcon v-if="typeLayout" name="i-material-symbols-grid-view-outline-rounded" class="w-full h-full" />
						<UIcon v-else name="i-material-symbols-lists-rounded" class="w-full h-full" />
					</div>
				</UTooltip>
			</div>
		</div>

		<!-- Conteúdo de Mídias (Lista) -->
		<div v-if="store.totalMidias" class="grid" :class="typeLayoutGrid">
			<div v-for="media in medias" :key="media.id"
				class="relative grid border rounded-xl mb-5 last:mb-0 px-4 py-2 shadow-md hover:shadow-lg hover:border-green-500 animate__animated animate__fadeInUp"
				:class="typeLayoutGridElements" v-auto-animate>

				<!-- se o layout mudar, exibir imagens de mídia caso seja esse o tipo -->
				<div v-if="isMedia(media.type) && !typeLayout" class="absolute top-2 right-5 w-auto max-w-[100px] h-28 p-1">
					<img v-if="media.value" class="w-full h-full object-contain object-center bg-gray-400 p-2 rounded-md"
						:src="`${pathAssets}${media.value}`">
					<img v-else class="w-full h-full object-contain object-center bg-gray-400 p-2 rounded-md"
						:src="`${media.placeholder}`">
				</div>

				<!-- Nome do conteúdo  -->
				<div :class="[typeLayoutGridElementsChildren, typeLayoutGridElementsChildrenTwo]">
					<small class="text-xs text-green-500">Nome do conteúdo (API):</small>
					<p class="line-clamp-1">{{ media.name }}</p>
				</div>

				<!-- Valor -->
				<div class="flex flex-col justify-center" :class="typeLayoutGridElementsChildrenTwo">
					<small class="text-xs text-green-500">Conteúdo da Mídia:</small>
					<div v-if="isMedia(media.type)">
						<UButton variant="link" class="p-0 m-0" label="Abrir mídia" @click="openModalMedias(media.value)" />
					</div>
					<div v-else-if="isList(media.type)">
						<p class=" text-lime-600 line-clamp-1 font-medium font-mono"
							v-html="`Lista: ${media.value.list[0].one}... ${media.value.list[0].two}`"></p>
					</div>
					<div v-else-if="isColor(media.type)">
						<div class="flex items-center">
							<div class="w-4 h-4 me-2 border border-zinc-950 rounded-sm" :style="`background-color: ${media.value}`">
							</div>
							<p class="line-clamp-1" v-html="media.value"></p>
						</div>
					</div>
					<div v-else-if="isText(media.type)">
						<p class="line-clamp-1 font-bold" v-html="media.value"></p>
					</div>
					<p v-else class="line-clamp-1" v-html="media.value"></p>
				</div>

				<!-- Tag -->
				<div :class="typeLayoutGridElementsChildrenTwo">
					<small class="text-xs text-green-500">Tag:</small>
					<p class="line-clamp-1">{{ media.tag }}</p>
				</div>

				<!-- Tipo -->
				<div :class="typeLayoutGridElementsChildrenTwo">
					<small class="text-xs text-green-500">Tipo:</small>
					<p>{{ media.type }}</p>
				</div>

				<!-- Açoes -->
				<div :class="typeLayoutGridElementsChildrenTwo">
					<small class="block text-md text-red-500">Ações:</small>
					<UButton color="red" icon="i-material-symbols-delete-forever-outline" variant="soft" size="sm" class="me-2"
						label="excluir" @click="store.openModalMediaDelete(media)" />
					<UButton color="sky" icon="i-material-symbols-edit-outline" variant="soft" size="sm" class="me-2"
						label="editar" @click="store.openModalMediaEdit(media.id)" />
					<UTooltip v-if="media.description" class="cursor-pointer" :text="media.description"
						:popper="{ placement: 'bottom' }">
						<UIcon class="text-2xl" name="i-material-symbols-contact-support-outline"
							@click="openModalDescription({ title: media.name, description: media.description })" />
					</UTooltip>
				</div>
				<div class="absolute right-0 top-0 rounded-e-xl w-[10px] h-full" :class="setTypesMediaStyle(media.type)"></div>
				<div v-if="media.value === null || media.value === undefined"
					class="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-red-600 animate-ping"></div>
			</div>

			<!-- Paginação -->
			<div class="flex justify-center mt-8" :class="typeLayoutPagination">
				<UPagination size="xl" v-model="page" :page-count="qtdPerPage" :max="maxNumersPagination"
					:total="store.filteredMedias(store.searchingMedia).length" :active-button="{ variant: 'outline' }"
					:inactive-button="{ color: 'gray' }"
					:prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Anterior', color: 'gray' }"
					:next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Próximo', color: 'gray' }"
					show-first show-last :first-button="{ icon: 'i-heroicons-document-plus-solid', color: 'gray' }"
					:last-button="{ icon: 'i-heroicons-document-minus-solid', trailing: true, color: 'gray' }" />
			</div>
		</div>
		<div v-else class="flex flex-col items-center justify-center animate__animated animate__tada">
			<UIcon name="i-material-symbols-sad-tab-rounded" class="w-20 h-20 text-red-500 opacity-95" />
			<div class="text-xl text-gray-500">
				<p>nenhuma mídia encontrada!</p>
			</div>
		</div>

		<!-- Modal para descrição da mídia -->
		<UModal v-model="isOpenModalDescription">
			<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							{{ detailsModal.title }}
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="closeModalDescption" />
					</div>
				</template>

				<div>
					{{ detailsModal.description }}
				</div>

				<Placeholder class="h-32" />
			</UCard>
		</UModal>

		<!-- Modal para mostrar as Mídias do tipo arquivo -->
		<UModal v-model="isOpenModalMedias">
			<UCard>
				<template #header>
					<div class="flex items-center justify-end uppercase">
						<UButton color="gray" variant="ghost" label="Fechar" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="isOpenModalMedias = false" trailing />
					</div>
				</template>
				<div class="p-4">
					<img class="m-auto bg-black p-2 rounded-md" v-if="mediaOpen" :src="`${pathAssets}${mediaOpen}`" alt=""
						srcset="">
					<div v-else class="flex flex-col justify-center items-center text-red-500">
						<UIcon name="i-material-symbols-tamper-detection-off-outline-sharp w-20 h-20" />
						<h3 class="">Mídia não cadastrada!</h3>
					</div>
				</div>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

const store = useStoreAdmin();
const { typesMedia, pathAssets } = useRuntimeConfig().public;

let isOpenModalDescription = ref(false);
let isOpenModalMedias = ref(false);

let detailsModal = ref({
	title: '',
	description: '',
});

let mediaOpen = ref('');

function openModalDescription(description) {
	isOpenModalDescription.value = true;
	detailsModal.value = description;
}

function openModalMedias(media) {
	isOpenModalMedias.value = true;
	mediaOpen = media;
}

function closeModalDescption() {
	isOpenModalDescription.value = false;
	detailsModal.value = {
		title: '',
		description: '',
	};
}

const typeLayout = ref(true);

const typeLayoutGrid = computed(() => {
	return {
		'grid-cols-2 gap-6': !typeLayout.value
	}
});

const typeLayoutPagination = computed(() => {
	return {
		'col-span-2': !typeLayout.value
	}
});

const typeLayoutGridElements = computed(() => {
	return {
		'grid-cols-[minmax(400px,1fr)_1fr_minmax(140px,140px)_minmax(80px,80px)_auto]': typeLayout.value,
		'grid-rows-2 grid-cols-2': !typeLayout.value
	}
});

const typeLayoutGridElementsChildren = computed(() => {
	return {
		'col-span-2': !typeLayout.value
	}
});

const typeLayoutGridElementsChildrenTwo = computed(() => {
	return {
		'mb-2': !typeLayout.value
	}
});

const setTypesMediaStyle = (type) => {
	switch (type) {

		case typesMedia[0]:
			return 'bg-red-300'
		case typesMedia[1]:
			return 'bg-blue-300'
		case typesMedia[2]:
			return 'bg-violet-300'
		case typesMedia[3]:
			return 'bg-teal-300'
		case typesMedia[4]:
			return 'bg-pink-300'
		case typesMedia[5]:
			return 'bg-amber-300'
		case typesMedia[6]:
			return 'bg-slate-300'
		case typesMedia[7]:
			return 'bg-lime-300'

		default:
			break;
	}
}

const isText = (type) => {
	return type === typesMedia[0];
}

const isColor = (type) => {
	return type === typesMedia[2];
}

const isMedia = (type) => {
	return type === typesMedia[3];
}

const isList = (type) => {
	return type === typesMedia[7];
}

// Paginação
const page = ref(1);
const maxNumersPagination = 5;
const qtdPerPage = 12;

const medias = computed(() => {
	return store.filteredMedias(store.searchingMedia).slice((page.value - 1) * qtdPerPage, (page.value) * qtdPerPage)
});
</script>

<style lang="css" scoped></style>
