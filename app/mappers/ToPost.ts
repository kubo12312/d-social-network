export default (data: any) => ({
  pubKey: data.pubKey ?? '',
  author: getAuthor(data.creator.toBase58()),
  content: data.content,
  createdAt: data.timestamp ?? '',
  likeCount: data.likeCount ?? 0,
  userLike: data.likers ?? false,
})

const getAuthor = (author: string) => {
  return author.slice(0, 6) + '...' + author.slice(-6)
}
