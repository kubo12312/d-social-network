import useWorkspace from '~~/composables/useWorkspace'

export default async () => {
  const workspace = useWorkspace()
  const tweets = await workspace.program.account.post.all()
  return tweets
}
