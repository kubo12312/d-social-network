import useWorkspace from '~~/composables/useWorkspace'
import { web3 } from '@project-serum/anchor'
import usePostsStore from '~~/stores/usePostsStore'

export default () => {
  const send = async (content: string) => {
    const workspace = useWorkspace()
    const post = web3.Keypair.generate()
    const postsStore = usePostsStore()
    const posts = usePosts()

    try {
      await workspace.program.rpc.postSend(content, {
        accounts: {
          creator: workspace.wallet!.publicKey,
          post: post.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [post],
      })

      const slicedKey = workspace.wallet!.publicKey.toBase58().slice(0, 6) + '...' + workspace.wallet!.publicKey.toBase58().slice(-6)

      const newPost = {
        pubKey: post.publicKey.toBase58(),
        author: slicedKey,
        content,
        createdAt: Date.now(),
        likeCount: 0,
        userLike: false,
        commentCount: 0,
      }

      const newPosts = [newPost, ...posts.posts];
      postsStore.$patch({ posts: newPosts })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    send,
  }
}
