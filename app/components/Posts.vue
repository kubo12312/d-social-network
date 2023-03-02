<template>
  <div>
    <Post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  posts: {
    type: Object,
    required: true,
  },
})
</script>
