import usePostsStore from "~~/stores/usePostsStore"

export default () => {
    const postsStore = usePostsStore()

    const posts = computed(() => postsStore.posts)

    return reactive({
        posts,
    })
}
