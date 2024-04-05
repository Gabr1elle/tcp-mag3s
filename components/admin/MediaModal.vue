<template>
	<div>
		<UModal v-model="store.isOpenModalMedia" :fullscreen="false" prevent-close
			:ui="{ width: 'sm:max-w-6xl', heigth: 'sm-min-w-full', padding: 'sm:mx-8' }" :transition="false">
			<UCard :ui="options">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-xl leading-6 dark:text-white uppercase font-semibold"
							:class="store.isEditMediaModal ? 'text-sky-700' : 'text-green-700'">
							{{ store.titleModalMedia }}
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="store.$resetFormMedia" />
					</div>
				</template>

				<!-- Content -->
				<div>
					<!-- Linha 1 do formulário -->
					<UForm class="grid grid-cols-9 gap-4 mb-8">

						<!-- Nome  -->
						<div class="col-span-3">
							<UFormGroup class="block mb-2" label="Nome do conteúdo:" name="name"
								help="Usado na api que alimenta da aplicação." size="xl" required>
								<UInput id="name" type="text" placeholder="Digite aqui..." :trailing="false"
									icon="i-material-symbols-media-link-outline-sharp" size="xl" v-model="store.formMedia.name"
									:disabled="store.isEditMediaModal" />
							</UFormGroup>
						</div>

						<!-- Tipo -->
						<div class="col-span-3">
							<UFormGroup class="block mb-2" label="Escolha o tipo de mídia:" name="type"
								help="Lista dos tipos de mídias." size="xl" required>
								<USelectMenu id="type" name="type" v-model="store.formMedia.typeMS" option-attribute="name"
									:options="store.typesMediaForm" value-attribute="value" placeholder="selecione aqui..."
									:trailing="false" icon="i-material-symbols-tamper-detection-on-sharp" size="xl"
									@change="store.$resetFormMediaValue" />
							</UFormGroup>
						</div>

						<!-- è uma tag nova? -->
						<div>
							<UFormGroup class="block mb-2" label="Nova Tag?" name="question" size="xl" required>
								<URadio id="question" name="question" v-for="question of store.newTag.questions" :key="question.name"
									v-model="store.newTag.choise" v-bind="question" :label="question.label" />
							</UFormGroup>
						</div>

						<!-- Tag / escolha da tag -->
						<div class="col-span-2">
							<div v-if="store.newTag.choise">
								<UFormGroup class="block mb-2" label="Nome da Tag:" name="tag" size="xl" required>
									<UInput id="tag" type="text" placeholder="Digite aqui..." :trailing="false"
										icon="i-material-symbols-new-label-sharp" v-model="store.formMedia.tagSelected" size="xl" />
								</UFormGroup>
							</div>

							<div v-else>
								<UFormGroup class="block mb-2" label="Escolha a Tag:" name="tag" size="xl" required>
									<USelectMenu v-model="store.formMedia.tagSelected" option-attribute="name"
										:options="store.tagsMediaFormSelected" value-attribute="name" placeholder="selecione aqui..."
										:trailing="false" icon="i-material-symbols-label-sharp" size="xl" />
								</UFormGroup>
							</div>
						</div>
					</UForm>

					<!-- Linha 2 do formulário -->
					<div class="grid grid-cols-none">
						<!-- Seleção do Tipo de mídia -->
						<div>
							<!-- Texto -->
							<div v-if="store.typeMediaSelectedForm === 'text'">
								<UFormGroup class="block mb-2" label="Insira o texto:" name="value" size="xl" required>
									<UTextarea id="value" type="text" placeholder="Digite aqui..." size="xl" :rows="5"
										v-model="store.formMedia.value" />
								</UFormGroup>
							</div>

							<!-- Link -->
							<div v-if="store.typeMediaSelectedForm === 'link'">
								<UFormGroup class="block mb-2" label="Insira o link:" name="value" size="xl" required>
									<UInput id="value" type="link" placeholder="Digite aqui..." size="xl" v-model="store.formMedia.value" />
								</UFormGroup>
							</div>

							<!-- Cor -->
							<div v-if="store.typeMediaSelectedForm === 'color'">
								<UFormGroup class="block mb-2" label="Insira a cor:" name="value" size="xl" required>
									<UInput id="value" type="color" placeholder="Escolha a cor..." size="xl" v-model="store.formMedia.value"
										:ui="{ base: 'h-[44px] max-w-[100px]' }" />
								</UFormGroup>
							</div>

							<!-- Imagem/Arquivo -->
							<div :class="store.editMediaValueArchive ? 'grid grid-cols-3 gap-4' : ''">
								<div v-if="store.typeMediaSelectedForm === 'archive'">
									<UFormGroup class="block mb-2" label="Insira a mídia:" name="fileMedia" size="xl" required>
										<UInput id="fileMedia" type="file" multiple size="xl" name="fileMedia"
											v-on:change="handleFileUpload" />
									</UFormGroup>
								</div>

								<div v-if="store.editMediaValueArchive" class="col-span-2">
									<Carousel :items-to-show="store.carouselListMaxMedia" :autoplay="2000" :pause-autoplay-on-hover="true"
										:wrap-around="store.carouselEnableLoop">
										<Slide v-for="mediaSlide in store.listArchiveMedia" :key="mediaSlide">
											<div class="carousel__item mx-1 relative h-[200px] max-w-[200px] bg-black">

												<!-- img -->
												<div v-if="mediaSlide.includes('image')">
													<img :src="`${pathAssets}${mediaSlide}`" class="h-max" alt="mediaSlide"
														:srcset="`${pathAssets}${mediaSlide}`">
												</div>

												<!-- pdf -->
												<div class="border-2 border-dashed border-sky-400 text-6xl px-8 py-8" v-else>
													<a :href="`${pathAssets}${mediaSlide}`" target="_blank" rel="noopener noreferrer">
														<UTooltip text="Abra o Documento">
															<UIcon name="i-material-symbols-picture-as-pdf" class="cursor-pointer text-red-600" />
														</UTooltip>
													</a>
												</div>

												<!-- Remover mídia -->
												<div class="text-red-600 bg-sky-100 text-2xl absolute bottom-0 left-0 w-full">
													<UTooltip text="Remover Arquivo">
														<UIcon name="i-material-symbols-delete" class="cursor-pointer"
															@click="store.selectArchiveMediaDelete(mediaSlide)" />
													</UTooltip>
												</div>
											</div>
										</Slide>

										<template #addons>
											<Navigation />
										</template>
									</Carousel>
								</div>
							</div>

							<!-- Data e Hora -->
							<div v-if="store.typeMediaSelectedForm === 'datetime'">
								<UFormGroup class="block mb-2" label="Insira a data e hora:" name="value" size="xl" required>
									<UInput id="value" type="datetime-local" placeholder="Escolha a data" size="xl"
										v-model="store.formMedia.value" />
								</UFormGroup>
							</div>

							<!-- Verdadeiro/Falso -->
							<div v-if="store.typeMediaSelectedForm === 'boolean'">
								<UFormGroup class="block mb-2" label="Escolha apenas 1 opção:" name="value" size="xl" required>
									<URadio v-for="(boolean,index) of store.formMedia.valueBoolean" :id="`value-${index}`" name="value" :key="boolean.name"
										v-model="store.formMedia.value" v-bind="boolean" :label="boolean.label" />
								</UFormGroup>
							</div>

							<!-- Lista -->
							<div v-if="store.typeMediaSelectedForm === 'json'">

								<!-- Escolha o tipo de mídia da lista -->
								<UFormGroup class="block mb-10" label="Tipo de mídia da lista" name="type" size="xl">
									<USelectMenu :id="`type-${index}`" :name="`type-${index}`" v-model="store.formMedia.typeJsonMS"
										option-attribute="name" :options="store.typesMediaJsonForm" value-attribute="value" placeholder="tipo"
										:trailing="false" icon="i-material-symbols-tamper-detection-on-sharp" size="xl"
										@change="store.$resetFormMediaValueJson" />
								</UFormGroup>

								<div v-for="(item, index) in store.formMedia.value.list" :key="`ghtwk${index}_fei`" v-auto-animate>
									<div class="flex justify-between mb-2">
										<div class="bg-purple-600 text-white flex justify-center items-center w-8 h-8 rounded-md font-black">
											<span>{{ index + 1 }}</span>
										</div>
										<UTooltip text="Remova esse item da lista" :popper="{ placement: 'left' }">
											<UButton icon="i-material-symbols-playlist-remove" size="sm" color="red" square variant="solid"
												@click="store.removeItemListJson(index)" />
										</UTooltip>
									</div>

									<!-- Primeiro Texto Editável ou Imagem/arquivo -->
									<UFormGroup v-if="store.typesMediaJsonTextOrFile" class="block mb-4" label="Insira o primeiro texto:"
										:name="`valueOne-${index}`" size="xl" required>
										<UTextarea :id="`valueOne-${index}`" type="text" placeholder="Digite aqui..." size="xl" :rows="1"
											v-model="store.formMedia.value.list[index].one" />
									</UFormGroup>
									<div v-else class="grid gap-4 grid-cols-[120px_1fr] mb-4">
										<div>
											<img :src="`${pathAssets}${store.formMedia.value.list[index].one}`" onerror="this.src='/imgs/lp/influencer.jpg'">
										</div>
										<UFormGroup class="block mb-4" label="Insira a imagem:" :name="`valueOne-${index}`" size="xl"
											required>
											<input :id="`fileMedia-${index}`" type="file" size="xl" :name="`fileMedia-${index}`"
												v-on:change="handleFileUploadMultiple($event, index)" />
										</UFormGroup>
									</div>

									<!-- Segundo Texto Editável -->
									<UFormGroup class="block" label="Insira o segundo texto:" :name="`valueOne-${index}`" size="xl"
										required>
										<UTextarea :id="`valueTwo-${index}`" type="text" placeholder="Digite aqui..." size="xl" :rows="5"
											v-model="store.formMedia.value.list[index].two" />
									</UFormGroup>

									<!-- Divisor -->
									<hr v-if="store.formMedia.value.list.length - 1 !== index" class="my-8 border-t-2"
										:class="store.isEditMediaModal ? 'border-sky-300' : 'border-green-300'">
								</div>

								<div class="flex justify-center mt-5">
									<UButton label="adicionar novo item na lista" size="sm" color="purple" variant="solid"
										icon="i-material-symbols-deployed-code-update-outline" :trailing="true"
										@click="store.newItemListJson" />
								</div>

							</div>

							<!-- Sem escolha -->
							<div v-if="store.typeMediaSelectedForm === null"
								class="flex flex-col items-center h-full w-full justify-end text-center text-red-500 font-medium">
								<UIcon class="text-5xl" name="i-material-symbols-deployed-code-outline-sharp" />
								<h3>O tipo de mídia selecionada<br /> aparecerá aqui!</h3>
							</div>
						</div>
					</div>
				</div>

				<template #footer>
					<!-- Content -->
					<div class="w-full grid grid-cols-5 text-center text-[60px]">
						<div>
							<UIcon v-if="store.formMedia.name" :class="store.isEditMediaModal ? 'text-sky-300' : 'text-green-300'"
								name="i-material-symbols-media-link-outline-sharp" />
							<UTooltip v-else text="Faltou preencher o Nome de conteúdo">
								<UIcon class="text-gray-300" name="i-material-symbols-media-link-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.typeMediaSelectedForm"
								:class="store.isEditMediaModal ? 'text-sky-300' : 'text-green-300'"
								name="i-material-symbols-tamper-detection-on-sharp" />
							<UTooltip v-else text="Faltou preencher o Tipo de mídia">
								<UIcon class="text-gray-300" name="i-material-symbols-tamper-detection-off-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.formMedia.value || store.formMedia.valueFilesMedia"
								:class="store.isEditMediaModal ? 'text-sky-300' : 'text-green-300'"
								name="i-material-symbols-deployed-code-outline-sharp" />
							<UTooltip v-else text="Faltou preencher a Mídia">
								<UIcon class="text-gray-300" name="i-material-symbols-deployed-code-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.formMedia.tagSelected"
								:class="store.isEditMediaModal ? 'text-sky-300' : 'text-green-300'"
								name="i-material-symbols-label-sharp" />
							<UTooltip v-else text="Faltou preencher a Tag">
								<UIcon class="text-gray-300" name="i-material-symbols-label-sharp" />
							</UTooltip>
						</div>

						<div class="flex items-center justify-center">
							<UButton v-if="store.isEditMediaModal" :loading="store.loading" label="Atualizar" size="xl"
								:color="store.completedForm ? 'sky' : 'gray'" variant="outline" :disabled="!store.completedForm"
								@click="store.putEditMedia(useToast)" />

							<UButton v-else :loading="store.loading" label="Salvar" size="xl"
								:color="store.completedForm ? 'green' : 'gray'" variant="outline" :disabled="!store.completedForm"
								@click="store.postNewMedia(useToast)" />
						</div>
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();
const { pathAssets } = useRuntimeConfig().public;

const options = ref({
	base: 'h-full flex flex-col',
	rounded: '',
	divide: 'divide-y divide-gray-100 dark:divide-gray-800',
	body: {
		base: 'grow'
	}
});

const handleFileUpload = (event) => {
	store.formMedia.valueFilesMedia = event;
}

const handleFileUploadMultiple = (event, index) => {
	store.deleteArchiveListJson(index);
	store.formMedia.value.list[index].one = event.target.files || event.dataTransfer.files;
}

</script>

<style scoped></style>
