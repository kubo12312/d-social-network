import { PublicKey } from "@solana/web3.js"
import ToPost from "~~/mappers/ToPost"
import usePostsStore from "~~/stores/usePostsStore"

export default async (publicKey: string) => {
    const workspace = useWorkspace()
    const postsStore = usePostsStore()
    const authorFilter = filters(publicKey)
    
    const response = await workspace.program.account.post.all([authorFilter])
  
    const mergedReponse = response.map((item: any, index: number) => {
        return {
        ...item.account,
        pubKey: item.publicKey.toBase58(),
        likers: workspace?.wallet?.publicKey ? item.account?.likers?.some((publicKey: PublicKey) => publicKey.equals(workspace?.wallet?.publicKey)) : false,
        }
    })

    mergedReponse.sort((a, b) => b.timestamp - a.timestamp)
    
    const posts = mergedReponse.map(ToPost)
    
    postsStore.$patch({ userPosts: posts })
}
