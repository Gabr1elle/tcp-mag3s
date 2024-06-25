<template>
  <NuxtLink :to="`/videos/${props.video.id}`" class="grid grid-cols-12 gap-3 lg:grid-cols-5">
    <div class="col-span-4 lg:col-span-2">
      <img v-if="props.video" :src="props.video.pictures.base_link" alt="" class="rounded">
    </div>
    <div class="col-span-8 lg:col-span-3">
      <strong class="title mt-4 lg:mt-0 ">{{ props.video.name }}</strong>
    </div>
    <div class="infos grid grid-cols-3 col-span-12 justify-between items-center mt-3">
      <div>
        <UIcon name="i-heroicons-eye" /> {{ props.video.stats.plays }}
      </div>
      <div>
        <UIcon name="i-heroicons-heart" /> {{ props.video.likes }}
      </div>
      <div>
        <UIcon name="i-heroicons-clock" /> {{ new Date(props.video.modified_time).toLocaleDateString('pt-BR', {
          month: '2-digit',
          year: 'numeric'
        })}}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { io } from "socket.io-client";
const socket = io();
const props = defineProps({
  video: Object
})
const videos = useVideosStore()
socket.on('updateLikesVideo', (data) => {
  if (data.videoId == props.video.id) {
    videos.data.forEach((video) => {
      if (video.id == data.videoId) {
        video.likes = data.likes
      }
    })
  }
});

</script>

<style lang="scss" scoped>
.card {

  .title {
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  .tag {
    font-size: .8rem;
  }
}
</style>
