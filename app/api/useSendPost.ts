import useWorkspace from '~~/composables/useWorkspace'
import { web3 } from '@project-serum/anchor'

export default () => {
  const workspace = useWorkspace()

  const send = async (content: string) => {
    const post = web3.Keypair.generate()
    console.log('post', post.publicKey)
    await workspace.program.rpc.sendPost(content, {
      accounts: {
        creator: workspace.wallet!.publicKey,
        post: post.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [post],
    })

    const postAccount = await workspace.program.account.post.fetch(post.publicKey)

    console.log(postAccount)
  }

  return {
    send,
  }
}
