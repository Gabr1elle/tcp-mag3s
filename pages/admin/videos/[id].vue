<template>
  <div v-if="singleVideo && currentVideos.length > 1" class="min-h-screen w-full flex justify-center items-center">
    <div class="w-full">
      <VideoSearch />
      <UContainer class="mt-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div id="background-banner" v-if="singleVideo" class="justify-center items-center w-full col-span-2">
            <UContainer class="container-video" :class="playerFixed ? 'active' : ''" v-if="singleVideo">
              <VideoEmbed :videos="singleVideo"/>
            </UContainer>
            <VideoInfos :video="singleVideo" @openComments="openComments" />
            <VideoComments :video="singleVideo" @commentsUpdate="updateComments" />
          </div>
          <div v-if="currentVideos">
            <VideoAllCards :videos="currentVideos" :grid="false" />
          </div>
        </div>
      </UContainer>
    </div>
  </div>
  <NavigationLoading v-else />
</template>

<script setup>
const videos = useVideosStore()
const $route = useRoute()
const id = $route.params.id
const singleVideo = ref()
let currentVideos = ref([])
let playerFixed = ref(false)
const positionScreen = ref(0)
let isLoading = false;

function updateComments(data) {
  singleVideo.value.comments = data
}

function openComments() {
  singleVideo.value.showComments = !singleVideo.value.showComments
}

onNuxtReady(async () => {
  window.addEventListener('scroll', currentPosicionScreen)

  if (videos.data.length === 0) {
    await videos.fetchVideos()
    }
  currentVideos.value = videos.data.filter(item => item.id !== id)
  await $fetch('/api/admin/video/'+id, {
    method: 'GET',
  }).then((res) => {
    singleVideo.value = res.data
    useHead({
        title: singleVideo.value.name,
    })
    singleVideo.value.showComments = false
  })
})


useHead({
    title: 'Carregando...',
})
const currentPosicionScreen = async () => {
  if (window.innerWidth > 1024) {
    return;
  }
  positionScreen.value = window.scrollY;
  let videoEmbedPosition = document.getElementById('videoEmbed').getBoundingClientRect();
  if (videoEmbedPosition.top <= 0 && positionScreen.value >= 20) {
    playerFixed.value = true;
  } else {
    playerFixed.value = false;
  }

  const pageHeight = document.documentElement.scrollHeight;
  if (positionScreen.value >= pageHeight - window.innerHeight - 100 && !isLoading) {
    isLoading = true;
    await loadMore();
    isLoading = false;

    setTimeout(() => {
      isLoading = false;
    }, 1000);
  }
}

async function loadMore() {
  if (isLoading) {
    videos.page++
    await videos.fetchVideos(videos.page, videos.perPage)
    currentVideos.value = videos.data.filter(item => item.id !== id)
  }
}

</script>

<style scoped lang="scss">
#background-banner {
  .container-video{
    position: relative;
    z-index: 10;
    min-height: 230px;
    max-height: 280px;
    &.active{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background-color: black;
    }
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
      min-height: 456px;
      max-height: 500px;
    }
    @media (min-width: 1920px) {
      min-height: 300px;
      max-height: 460px;
    }
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
