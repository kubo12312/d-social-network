<template>
  <div v-if="!user.userExists">
    <Button text="Create Account" class="h-12 mb-4 w-full font-bold" @click="openModal = true" />

    <Modal v-if="openModal" @close="openModal = false" @submit="createUser" />
  </div>
</template>

<script setup lang="ts">
import { client } from '~~/lib/sanity'
import useUserStore from '~~/stores/useUserStore'

const workspace = useWorkspace()
const userStore = useUserStore()
const user = useUser()

const openModal = ref(false)

onMounted(async () => {
  const user = await client.fetch('*[_type == "user" && publicKey == $publicKey][0]', {
    publicKey: workspace.wallet.publicKey.toBase58(),
  })

  if (user) {
    userStore.$patch({ userName: user.name })
  }
})

const createUser = async (data: { name: string }) => {
  try {
    await client.createOrReplace({
      _type: 'user',
      _id: workspace.wallet.publicKey.toBase58(),
      name: 'Kubo',
      publicKey: workspace.wallet.publicKey.toBase58(),
    })
  } catch (e) {
    console.log(e)
  }

  const user = await client.fetch('*[_type == "user" && publicKey == $publicKey][0]', {
    publicKey: workspace.wallet.publicKey.toBase58(),
  })

  if (user) {
    userStore.$patch({ userName: user.name })
  }
}
</script>
