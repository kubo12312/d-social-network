import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export default (data: any) => ({
  author: getAuthor(data.account.authority.toBase58()),
  content: data.account.content,
  createdAt: data.account.postTime ?? '',
})

const getAuthor = (author: string) => {
  return author.slice(0, 6) + '...' + author.slice(-6)
}
