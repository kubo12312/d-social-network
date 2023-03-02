import { PublicKey } from '@solana/web3.js'
import { client } from '~~/lib/sanity'
import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'
import useUserStore from '~~/stores/useUserStore'

export default async (page: number) => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const oldPosts = postsStore.posts

  const paginatedKeys = postsStore.accountKeys.slice(10 * (page - 1), 10 * page)

  const response = await workspace.program.account.post.fetchMultiple(paginatedKeys)

  const mergedReponse = response.map((item: any, index: number) => {
    return {
      ...item,
      pubKey: paginatedKeys[index].toBase58(),
      likers: workspace?.wallet?.publicKey ? item?.likers?.some((publicKey: PublicKey) => publicKey.equals(workspace?.wallet?.publicKey)) : false,
    }
  })

  const posts = mergedReponse.map(ToPost)

  postsStore.$patch({ posts, ...oldPosts })
}
