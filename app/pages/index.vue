<template>
  <PostForm />
  <div class="space-y-6">
    <!-- <Post v-for="(post, index) in posts" :key="index" :post="post" /> -->
  </div>
</template>

<script setup lang="ts">
import useFetchAccounts from '~~/api/useFetchAccounts'
import { useInfiniteScroll } from '@vueuse/core'
import useFetchPosts from '~~/api/useFetchPosts';

const page = ref(0)

await useFetchAccounts()

await useFetchPosts(page.value)
</script>
