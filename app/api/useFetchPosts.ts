import useWorkspace from '~~/composables/useWorkspace'
import ToPost from '~~/mappers/ToPost'

export default async () => {
  const workspace = useWorkspace()
  const posts = await workspace.program.account.post.all()

  return posts.map(ToPost)
}
