<script setup lang="ts">
import CommunityWall from './components/CommunityWall.vue'
import GlowLayer from './components/GlowLayer.vue'
import wall from './public/community/wall.webp'
</script>

<template>
  <GlowLayer />
  <CommunityWall :src="wall" />
</template>
