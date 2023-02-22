import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'

export default () => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const postLike = async (postPubKey: string) => {
    try {
      await workspace.program.rpc.likePost({
        accounts: {
          post: postPubKey,
          authority: workspace.wallet!.publicKey,
        },
      })

      const post = postsStore.posts.find((item: ReturnType<typeof ToPost>) => {
        if (item.pubKey === postPubKey) {
          item.userLike = true
          item.likeCount = item.likeCount + 1
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    postLike,
  }
}
