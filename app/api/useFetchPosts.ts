import usePostsStore from "~~/stores/usePostsStore"

export default async (page: number) => {
    const workspace = useWorkspace()
    const postsStore = usePostsStore()


    const paginatedKeys = postsStore.accountKeys.slice(10 * page, 10 * (page + 1))
    console.log(paginatedKeys)
    const accountInfos = await workspace.program.account.post.fetchMultiple(paginatedKeys)

}
