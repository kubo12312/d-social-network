import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'
import useFetchUserImage from '~~/api/useFetchUserImage'

export default async (publicKey: string) => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()
  const fetchUserImage = useFetchUserImage()
  const authorFilter = filters(publicKey)

  const response = await workspace.program.account.post.all([authorFilter])

  const mergedReponse = await Promise.all(response.map(async (item: any) => {
    return {
      ...item.account,
      pubKey: item.publicKey.toBase58(),
      userImage: await fetchUserImage.getUserImage(item.account.creator.toBase58()),
    }
  }))

  mergedReponse.sort((a, b) => b.timestamp - a.timestamp)

  const posts = mergedReponse.map(ToPost)

  postsStore.$patch({ userPosts: posts })
}
