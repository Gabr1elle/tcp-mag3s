<template>
    <iframe
      v-if="videos"
      :src="`${videos.links.embed}?portrait=0&byline=0&title=0&transcript=0&speed=0&autopause=0&muted=1&autoplay=1&playsinline=1&player_id=0`"
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      style="position:absolute;top:0;left:0;width:100%;height:100%"
      id="videoEmbed"
    />

</template>

<script setup>
const props = defineProps({
  videos: Object
})
</script>
