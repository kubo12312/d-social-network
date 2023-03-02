import usePostsStore from '~~/stores/usePostsStore'

export default () => {
  const postsStore = usePostsStore()

  const posts = computed(() => postsStore.posts)

  const userPosts = computed(() => postsStore.userPosts)

  const accountKeys = computed(() => postsStore.accountKeys)

  const maxPage = computed(() => Math.round(postsStore.accountKeys.length / 10))

  return reactive({
    posts,
    accountKeys,
    maxPage,
    userPosts,
  })
}
