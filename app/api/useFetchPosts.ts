import ToPost from '~~/mappers/ToPost'
import usePostsStore from '~~/stores/usePostsStore'
import useFetchUserImage from './useFetchUserImage'

export default async (page: number) => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()
  const fetchUserImage = useFetchUserImage()

  const oldPosts = postsStore.posts

  const paginatedKeys = postsStore.accountKeys.slice(10 * (page - 1), 10 * page)

  const response = await workspace.program.account.post.fetchMultiple(paginatedKeys)

  const mergedReponse = await Promise.all(
    response.map(async (item: any, index: number) => {
      return {
        ...item,
        pubKey: paginatedKeys[index].toBase58(),
        timestamp: item.timestamp.toNumber(),
        userImage: await fetchUserImage.getUserImage(item.creator.toBase58()),
      }
    }),
  )

  const posts = mergedReponse.map(ToPost)
  const newPosts = [...oldPosts, ...posts]

  postsStore.$patch({ posts: newPosts })
}
