export default (data: any) => ({
  userName: data.name,
  pubKey: data.publicKey,
  userImage: data.profileImage?.asset?._ref ?? '',
})
