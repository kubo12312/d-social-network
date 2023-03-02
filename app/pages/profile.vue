<template>
  <div v-infinite-scroll="onLoadMore" class="overflow-y-scroll h-screen pt-6 pb-6">
    <ProfileHeader />
    <Posts :posts="posts.userPosts" />
  </div>
</template>

<script setup lang="ts">
import useFetchProfilePosts from '~~/api/useFetchProfilePosts'
import { vInfiniteScroll } from '@vueuse/components'
import usePosts from '~~/composables/usePosts'
import useWorkspace from '~~/composables/useWorkspace'
import usePostsStore from '~~/stores/usePostsStore'

const posts = usePosts()
const postsStore = usePostsStore()
const workspace = useWorkspace()

const page = ref(1)
const maxPage = ref(Math.round(posts.userPosts.length / 10))
const userPosts = ref(posts.userPosts.slice((page.value - 1) * 10, page.value * 10))

await useFetchProfilePosts(workspace.wallet.publicKey.toBase58())

onUnmounted(() => {
  postsStore.userPosts = []
})

const addNewPosts = () => {
  const newPosts = posts.userPosts.slice((page.value - 1) * 10, page.value * 10)
  userPosts.value = [...userPosts.value, ...newPosts]
}

const onLoadMore = () => {
  if (page.value < maxPage.value) {
    page.value = page.value + 1
    addNewPosts()
  }
}
</script>
