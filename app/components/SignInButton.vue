<template>
  <div v-if="!user.userExists">
    <Button text="Create Account" class="h-12 mb-4 w-full font-bold" @click="openModal = true" />

    <Modal v-if="openModal" @close="openModal = false" @submit="submitUser" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from '~~/stores/useUserStore'
import useCreateOrEditUser from '~~/api/useCreateOrEditUser'
import useFetchUser from '~~/api/useFetchUser'

const workspace = useWorkspace()
const userStore = useUserStore()
const user = useUser()
const createOrEditUser = useCreateOrEditUser()
const fetchUser = useFetchUser()

const openModal = ref(false)

onMounted(async () => {
  const user = await fetchUser.getUser(workspace?.wallet?.publicKey?.toBase58() ?? '')

  console.log(user)

  if (user) {
    userStore.$patch({ user })
  }
})

const submitUser = async (data: { name: string; userImage: File | null }) => {
  const response = await createOrEditUser.createOrReplace(data.name, data.userImage)
}
</script>
