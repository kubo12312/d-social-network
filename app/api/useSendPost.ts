import useWorkspace from '~~/composables/useWorkspace'
import { web3 } from '@project-serum/anchor'

export default () => {

  const send = async (content: string) => {
    const workspace = useWorkspace()
    const post = web3.Keypair.generate()
    await workspace.program.rpc.sendPost(content, {
      accounts: {
        creator: workspace.wallet!.publicKey,
        post: post.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [post],
    })
  }

  return {
    send,
  }
}
