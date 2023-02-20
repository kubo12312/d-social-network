import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export default (data: any) => ({
  author: getAuthor(data.account.creator.toBase58()),
  content: data.account.content,
  createdAt: getTimeFromNow(data.account.timestamp),
})

const getTimeFromNow = (timestamp: number) => {
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)

  return dayjs.unix(timestamp).fromNow()
}

const getAuthor = (author: string) => {
  return author.slice(0, 6) + '...' + author.slice(-6)
}
