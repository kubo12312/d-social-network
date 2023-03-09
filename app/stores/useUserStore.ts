import ToUser from '~~/mappers/ToUser'

export default defineStore('user', {
  state: () => ({
    user: {} as ReturnType<typeof ToUser>,
  }),
})
