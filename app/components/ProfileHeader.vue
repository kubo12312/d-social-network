<template>
  <div class="border-b border-gray-200 max-w-screen-md pb-4 mb-4 flex items-start">
    <div>
      <SanityImage :image="user.userImage" :width="112" :height="112" class="h-28 w-28" />

      <h2 class="text-2xl font-bold mt-4">{{ user.userName }}</h2>
      <p class="text-gray-400 text-sm mt-2">{{ user.pubKey }}</p>
    </div>
    <Button class="mt-auto ml-auto" text="Follow" />
  </div>
</template>

<script setup lang="ts">import useFetchUser from '~~/api/useFetchUser';

const workspace = useWorkspace()
const fetchUser = useFetchUser()

const props = defineProps({
  pubKey: {
    type: String,
    required: true,
  },
})

const user = await fetchUser.getUser(props.pubKey)

console.log(user)
</script>
