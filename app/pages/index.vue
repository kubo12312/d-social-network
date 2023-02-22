<template>
  <div v-infinite-scroll="onLoadMore" class="overflow-y-scroll h-[calc(100vh_-_64px)] pt-6 pb-6">
    <PostForm />
    <div class="space-y-6">
      <Post v-for="(post, index) in posts.posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchAccounts from '~~/api/useFetchAccounts'
import { vInfiniteScroll } from '@vueuse/components'
import useFetchPosts from '~~/api/useFetchPosts'
import usePosts from '~~/composables/usePosts'

const posts = usePosts()

const page = ref(0)
const maxPage = ref(Math.round(posts.accountKeys.length / 10))

await useFetchAccounts()

await useFetchPosts(page.value)

const onLoadMore = async () => {
  if (page.value < maxPage.value) {
    page.value = page.value + 1
    await useFetchPosts(page.value)
  }
}
</script>
