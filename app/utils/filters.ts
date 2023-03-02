export default (publicKey: string) => {
  return {
    memcmp: {
      offset: 8,
      bytes: publicKey,
    },
  }
}
