export default (data: any) => ({
  pubKey: data.pubKey ?? '',
  creatorPubKey: data.creator.toBase58(),
  author: data.creatorName ?? '',
  content: data.content,
  createdAt: data.timestamp ?? '',
  likeCount: data.likeCount ?? 0,
  likers: data.likers ?? [],
  commentCount: data.commentCount ?? 0,
  userImage: data.userImage ?? '',
})
