import { client } from '~~/lib/sanity'
import useUserStore from '~~/stores/useUserStore'
import { compressAccurately } from 'image-conversion'

export default () => {
  const workspace = useWorkspace()
  const userStore = useUserStore()

  const createOrReplace = async (name: string, image: File | null) => {
    let resizedImage = null

    if (image) {
      resizedImage = await compressAccurately(image, {
        width: 250,
        height: 250,
        quality: 0.8,
      })
    }

    const imageAsset = resizedImage ? await client.assets.upload('image', resizedImage) : null

    try {
      await client.createOrReplace({
        _type: 'user',
        _id: workspace.wallet.publicKey.toBase58(),
        name: name,
        publicKey: workspace.wallet.publicKey.toBase58(),
        profileImage: imageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } } : '',
      })

      userStore.$patch({ userName: name, userImage: imageAsset?._id ?? '' })

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return {
    createOrReplace,
  }
}
