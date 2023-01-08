import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { DSocialNetwork } from '../target/types/d_social_network'
import * as assert from 'assert'

describe('d-social-network', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.DSocialNetwork as Program<DSocialNetwork>

  it('send post', async () => {
    const post = anchor.web3.Keypair.generate()
    await program.rpc.postSend('First Content', {
      accounts: {
        post: post.publicKey,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [post],
    })
    const postAccount = await program.account.post.fetch(post.publicKey)

    assert.equal(postAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58())
    assert.equal(postAccount.content, 'First Content')
    assert.ok(postAccount.timestamp)
  })
})
