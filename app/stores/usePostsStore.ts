import { PublicKey } from '@solana/web3.js'
import ToPost from '~~/mappers/ToPost'

export default defineStore('posts', {
  state: () => ({
    accountKeys: [] as PublicKey[],
    posts: [] as ReturnType<typeof ToPost>[],
  }),
})
