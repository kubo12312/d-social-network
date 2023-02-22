import usePostsStore from '~~/stores/usePostsStore'

export default () => {
  const postsStore = usePostsStore()

  const posts = computed(() => postsStore.posts)

  const accountKeys = computed(() => postsStore.accountKeys)

  return reactive({
    posts,
    accountKeys,
  })
}
