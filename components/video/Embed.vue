<template>
    <iframe
      v-if="videos"
      :src="`${videos.links.embed}?portrait=${portrait}&byline=${byline}&title=${title}&transcript=${transcript}&speed=${speed}&autopause=${autopause}&muted=${muted}&autoplay=${autoplay}&playsinline=${playsinline}&player_id=${player_id}`"
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      style="position:absolute;top:0;left:0;width:100%;height:100%;z-index: 1;"
      id="videoEmbed"
    />

</template>

<script setup>

const props = defineProps({
  videos: Object,
	portrait: {
		type: Boolean,
		default: false
	},
	byline: {
		type: Boolean,
		default: false
	},
	title: {
		type: Boolean,
		default: false
	},
	transcript: {
		type: Boolean,
		default: false
	},
	speed: {
		type: Boolean,
		default: false
	},
	autopause: {
		type: Boolean,
		default: false
	},
	muted: {
		type: Boolean,
		default: true
	},
	autoplay: {
		type: Boolean,
		default: true
	},
	playsinline: {
		type: Boolean,
		default: true
	},
	player_id: {
		type: Number,
		default: 0
	}

})
</script>
