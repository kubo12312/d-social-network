import useUserStore from '~~/stores/useUserStore'

export default () => {
  const userStore = useUserStore()

  const userName = computed(() => userStore.user.userName)

  const userImage = computed(() => userStore.user.userImage)

  const userExists = computed(() => (userName.value ? true : false))

  return reactive({
    userName,
    userImage,
    userExists,
  })
}
