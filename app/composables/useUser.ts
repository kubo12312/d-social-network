import useUserStore from '~~/stores/useUserStore'

export default () => {
  const userStore = useUserStore()

  const userName = computed(() => userStore.userName)

  const userImage = computed(() => userStore.userImage)

  const userExists = computed(() => (userName.value ? true : false))

  return reactive({
    userName,
    userImage,
    userExists,
  })
}
