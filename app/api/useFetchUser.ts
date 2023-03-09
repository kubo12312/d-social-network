import { client } from '~~/lib/sanity'
import ToUser from '~~/mappers/ToUser'

export default () => {
  const getUser = async (publicKey: string) => {
    try {
      const response = await client.fetch('*[_type == "user" && publicKey == $publicKey][0]', {
        publicKey,
      })
      const user = ToUser(response)
      return user
    } catch (e) {
      console.log(e)
      return ToUser(null)
    }
  }

  return {
    getUser,
  }
}
