import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import usePostsStore from '~~/stores/usePostsStore'

export default async () => {
  const workspace = useWorkspace()
  const postsStore = usePostsStore()

  const accountsWithoutData = await workspace.connection.getProgramAccounts(workspace.program.programId, {
    dataSlice: { offset: 40, length: 8 },
  })

  const allTweetsWithTimestamps = accountsWithoutData.map(({ account, pubkey }) => ({
    pubkey,
    timestamp: new BN(account.data, 'le'),
  }))

  const accountKeys = allTweetsWithTimestamps
    .sort((a: any, b: any) => b.timestamp.cmp(a.timestamp))
    .map(({ pubkey }) => pubkey)

  postsStore.$patch({ accountKeys })
}
