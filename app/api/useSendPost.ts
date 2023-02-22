import useWorkspace from '~~/composables/useWorkspace'
import { AnchorError, web3 } from '@project-serum/anchor'
import { program } from '@project-serum/anchor/dist/cjs/native/system'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export default () => {

  const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: web3.SystemProgram.programId,
  }

  const send = async (content: string) => {
    const workspace = useWorkspace()

    const [stateSigner] = web3.PublicKey.findProgramAddressSync([utf8.encode('state')], workspace.program.programId)

    let stateInfo: any

    try {
      stateInfo = await workspace.program.account.stateAccount.fetch(stateSigner)
    } catch (e) {
      await workspace.program.rpc.createState({
        accounts: {
          state: stateSigner,
          authority: workspace.wallet.publicKey,
          ...defaultAccounts,
        },
      })

      return
    }

    let [postSigner] = web3.PublicKey.findProgramAddressSync(
      [utf8.encode('post'), stateInfo.postCount.toArrayLike(Buffer, 'be', 8)],
      workspace.program.programId,
    )

    try {
      await workspace.program.account.post.fetch(postSigner)
    } catch (e) {
      await workspace.program.rpc.sendPost(content, {
        accounts: {
          state: stateSigner,
          post: postSigner,
          authority: workspace.wallet.publicKey,
          ...defaultAccounts
        }
      })
    }
  }

  return {
    send,
  }
}
