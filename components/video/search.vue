<template>
  <UContainer>
    <div class="my-2">
      <UForm @submit="search">
        <div class="grid grid-cols-12 gap-4">
          <VideoFilterTags />
          <div class="col-span-11">
            <UInput v-model="searchQuery" placeholder="Pesquisar"/>
          </div>
          <div class="flex items-center">
            <UButton type="submit" :disabled="searchQuery.length <= 3" :loading="isLoading" icon="i-heroicons-magnifying-glass" />
          </div>
        </div>
      </UForm>
    </div>
    <div class="container-data" :style="{ 'max-height': containerMaxHeight + 'px', overflowY: 'scroll', transition: 'max-height 0.5s ease-in-out' }">
      <VideoAllCards :videos="dataSearch" :grid="true" />
      <div v-if="dataSearch.length > 0" class="flex justify-center">
        <UButton :loading="isLoading"  @click="loadMore" icon="i-heroicons-arrow-down" />
      </div>
    </div>
  </UContainer>
</template>


<script lang="ts" setup>

const searchQuery = ref('')
const containerMaxHeight = ref(0)

const dataSearch = ref([])

const isLoading = ref(false)
const videos = useVideosStore()

const search = async () => {
  isLoading.value = true
  if (searchQuery.value.length >= 3) {
    await $fetch('/api/admin/video/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: searchQuery.value,
        page: videos.search.page,
        perPage: videos.search.perPage
      })
    }).then((res) => {
      const dataRequest = {
        query: searchQuery.value,
        page: videos.search.page,
        perPage: videos.search.perPage,
        data: res.data
      }
      videos.setSearchContent(dataRequest)
      dataSearch.value = videos.search.data
      containerMaxHeight.value = 750

      // setSearchContent(data)
      isLoading.value = false
    })
  }
}
watch(videos.search, (value) => {
  if (value.query === '') {
    containerMaxHeight.value = 0

    setTimeout(() => {
      dataSearch.value = []
    }, 500)
  }
})

async function loadMore() {
  isLoading.value = true
  videos.search.page++
  containerMaxHeight.value = 0
  await search()
  isLoading.value = false
}

</script>

<style lang="scss" scoped>
.container-data {
  transition: max-height 0.5s ease-in-out;
}
</style>
