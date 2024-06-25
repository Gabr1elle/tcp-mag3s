<template>
  <div class="mt-10 lg:mt-0 w-full">
    <div v-if="!grid" class="sidebar">
      <VideoCard v-for="video in props.videos" :key="video.id" :video="video"/>
    </div>
    <UCard v-else>
        <template #header>
          <div class="grid grid-cols-12">
            <div class="col-span-11">
              Busca: <strong>{{ videosStore.search.query }}</strong>
            </div>
            <div class="col-span-1 flex items-center justify-center">
              <UButton @click="videosStore.clearSearch" icon="i-heroicons-x-mark" />
            </div>
          </div>
        </template>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <VideoCard v-for="video in props.videos" :key="video.id" :video="video"/>
        </div>
    </UCard>
  </div>
</template>

<script setup>

const props = defineProps({
  videos: Array,
  grid: {
    type: Boolean,
    default: false,
  },
})
const videosStore = useVideosStore()

</script>
<style lang="scss">
.sidebar{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
