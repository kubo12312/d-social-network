<template>
  <PostForm />
  <div class="space-y-6">
    <Post v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>

<script setup lang="ts">
import useFetchPosts from '~~/api/useFetchPosts'

const posts = await useFetchPosts()
</script>
