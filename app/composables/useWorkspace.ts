import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { useAnchorWallet, useWallet } from 'solana-wallets-vue'
import idl from '~~/../target/idl/d_social_network.json'

export default () => {
  const user = useUser()

  const programID = new PublicKey(idl.metadata.address)

  const wallet = computed(() => useAnchorWallet().value!)

  const connection = computed(() => new Connection('http://127.0.0.1:8899'))

  const provider = computed(
    () =>
      new AnchorProvider(connection.value, wallet.value, { preflightCommitment: 'processed', commitment: 'processed' }),
  )

  // @ts-ignore
  const program = computed(() => new Program(idl, programID, provider.value))

  const fullySignedIn = computed(() => useWallet().connected && user.userExists)

  return reactive({
    wallet,
    connection,
    provider,
    program,
    fullySignedIn,
  })
}
