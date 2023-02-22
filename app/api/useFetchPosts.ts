import { PublicKey } from '@solana/web3.js'
import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'

export default async (page: number) => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const oldPosts = postsStore.posts

  const paginatedKeys = postsStore.accountKeys.slice(10 * page, 10 * (page + 1))

  const response = await workspace.program.account.post.fetchMultiple(paginatedKeys)

  const mergedReponse = response.map((item: any, index: number) => {
    return {
      ...item,
      pubKey: paginatedKeys[index].toBase58(),
      likers: item?.likers?.some((publicKey: PublicKey) => publicKey.equals(workspace.wallet.publicKey)) ?? false
    }
  })

  console.log(mergedReponse[0])

  const posts = mergedReponse.map(ToPost)

  postsStore.$patch({ posts, ...oldPosts })
}
