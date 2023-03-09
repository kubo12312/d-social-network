<template>
  <div v-infinite-scroll="onLoadMore" class="overflow-y-scroll h-screen pt-6 pb-6">
    <PostForm />
    <Posts :posts="posts.posts" />
  </div>
</template>

<script setup lang="ts">
import useFetchAccounts from '~~/api/useFetchAccounts'
import { vInfiniteScroll } from '@vueuse/components'
import useFetchPosts from '~~/api/useFetchPosts'
import usePosts from '~~/composables/usePosts'
import usePostsStore from '~~/stores/usePostsStore';

const posts = usePosts()
const postsStore = usePostsStore()

const page = ref(1)

await useFetchAccounts()

await useFetchPosts(page.value)

const onLoadMore = async () => {
  if (page.value < posts.maxPage) {
    page.value = page.value + 1
    await useFetchPosts(page.value)
  }
}

onUnmounted(() => {
  postsStore.$patch({ posts: [], accountKeys: [] })
})
</script>
