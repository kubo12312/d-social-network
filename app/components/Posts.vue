<template>
  <div>
    <Post v-for="(post, index) in posts.posts" :key="index" :post="post" />
  </div>
</template>

<script setup lang="ts">
import usePosts from '~~/composables/usePosts'

const posts = usePosts()
</script>
