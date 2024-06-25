<template>
  <div class="min-h-screen w-full flex justify-center items-center">
    <div class="w-full">
      <h1 class="text-3xl font-bold text-center">
        Vídeos
      </h1>
      <UContainer class="mt-4">
        <div class="grid lg:grid-cols-3">
          <div id="background-banner" v-if="videos.data[0]" class="justify-center items-center w-full col-span-2">
            <UContainer v-if="videos.data[0]">
              <VideoEmbed :videos="videos.data[0]" />
            </UContainer>
          </div>
          <!-- Cards components -->
           <div v-if="videos.data[0]" class="lg:ml-4">
             <VideoAllCards :videos="videos.data" :grid="false" />
           </div>
        </div>
      </UContainer>
      <!-- Banner destaque -->
    </div>
  </div>
</template>

<script setup>
import { useVideosStore } from '~/stores/videos'

const videos = useVideosStore()

onNuxtReady(async () => {
  if (videos.data.length === 0) {
    await videos.fetchVideos()
  }
  currentVideos.value = videos.data.filter(item => item.id !== id)
})

</script>

<style scoped lang="scss">
#background-banner {
  position: relative;
  z-index: 10;
  min-height: 230px;
  max-height: 280px;
  @media (min-width: 540px) {
    min-height: 290px;
    max-height: 340px;

  }
  @media (min-width: 768px) {
    min-height: 410px;
    max-height: 500px;
  }
  @media (min-width: 900px) {
    min-height: 475px;
    max-height: 500px;
  }
  @media (min-width: 1024px) {
    min-height: 300px;
    max-height: 365px;
  }
  @media (min-width: 1366px) {
    min-height: 300px;
    max-height: 455px;
  }
  @media (min-width: 1920px) {
    min-height: 300px;
    max-height: 460px;
  }

  h2 {
    font-size: 2rem;
    color: white;
    text-align: center;
  }

  .banner-video-info {
    color: white;
    position: relative;
    z-index: 2;
    min-height: inherit;
  }
}
</style>
