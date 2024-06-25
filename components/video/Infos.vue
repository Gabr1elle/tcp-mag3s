<template>
  <div class="video-infos">
    <UCard>
      <template #header>
        <div class="grid grid-cols-4 justify-between">
          <div class="col-span-4 mt-2 mb-4">
            <h2 class="text-2xl font-bold">{{ video.name }}</h2>
          </div>
          <div class="flex items-center justify-start gap-4">
            <UButton @click="liked ? unlike(video, currentLike.id) : like(video)" color="red" variant="ghost">
              {{ video.likes ? video.likes : 0 }} - <UIcon :name="`${(liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart')}`" />
            </UButton>
          </div>
          <div class="flex items-center justify-center gap-4">
            <UIcon name="i-heroicons-eye" /> {{ video.stats.plays }}
          </div>
          <div class="flex items-center justify-center gap-4">
            <UIcon name="i-heroicons-calendar" />
            {{ new Date(video.created_time).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}}
          </div>
          <div class="flex items-center justify-end gap-4">
            <UButton @click="toggleComments" variant="ghost" color="black">

              <UIcon :name="solid ? 'i-heroicons-chat-bubble-left-solid' : 'i-heroicons-chat-bubble-left'" /> {{ video.comments.length }}
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>

import { io } from "socket.io-client";
const socket = io();

const liked = ref(false)
const currentLike = ref(false)
const user = useUserAuth();
const solid = ref(false)
const props = defineProps({
  video: Object
})

const emit = defineEmits(['openComments'])

const toggleComments = () => {
  solid.value = !solid.value
  emit('openComments')
}

onNuxtReady(async () => {
  await $fetch('/api/admin/video/verifyLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      video: props.video.id,
      userId: user.id
    })
  }).then((res) => {

    if (res.statusCode != 200) {
      liked.value = false
      } else {
      currentLike.value = res.body
      liked.value = true
    }
  })
})

socket.on('videoLikesCount', (data) => {
  props.video.likes = data.body
});

socket.on('currentUserLike', (data) => {
  if (data.body.userId == user.id) {
    currentLike.value = data.body
  }
});

watch(currentLike, (value) => {
  if (value) {
    liked.value = true
  } else {
    liked.value = false
  }
})

async function like(video) {
  let id = video.id;
  const data = {
    video: id,
    userId: user.id
  }
  socket.emit('likeVideo', data)
}
async function unlike(video ,idLike) {
  const data = {
    id: idLike,
    video: video.id
  }
  socket.emit('deleteLike', data)
  currentLike.value = false
}
</script>
