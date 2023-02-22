import { Address } from '@project-serum/anchor'
import ToPost from '~~/mappers/ToPost'

export default defineStore('posts', {
  state: () => ({
    accountKeys: [] as string[],
    posts: [] as ReturnType<typeof ToPost>[],
  }),
})
