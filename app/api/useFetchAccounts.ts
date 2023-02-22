import useWorkspace from '~~/composables/useWorkspace'
import usePostsStore from '~~/stores/usePostsStore'

export default async () => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const accountsWithoutData = await workspace.connection.getProgramAccounts(workspace.program.programId, {
    dataSlice: { offset: 40, length: 8 },
  })

  const accountKeys = accountsWithoutData.map((item) => item.pubkey.toBase58())

  console.log(accountKeys)

  postsStore.$patch({ accountKeys })
}
 