import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'

export default () => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const postUnlike = async (postPubKey: string) => {
    try {
      await workspace.program.rpc.postUnlike({
        accounts: {
          post: postPubKey,
          authority: workspace.wallet!.publicKey,
        },
      })

      postsStore.posts.find((item: ReturnType<typeof ToPost>) => {
        if (item.pubKey === postPubKey) {
          item.likers.splice(item.likers.indexOf(workspace.wallet!.publicKey), 1)
          item.likeCount = item.likeCount - 1
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    postUnlike,
  }
}
