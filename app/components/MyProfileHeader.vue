<template>
  <div class="border-b border-gray-200 max-w-screen-md pb-4 mb-4 flex items-start">
    <div>
      <SanityImage :image="user.userImage" :width="112" :height="112" class="h-28 w-28" />

      <h2 class="text-2xl font-bold mt-4">{{ user.userName }}</h2>
      <p class="text-gray-400 text-sm mt-2">{{ workspace.wallet.publicKey.toBase58() }}</p>
    </div>
    <Button class="mt-auto ml-auto" text="Edit" />
  </div>
</template>

<script setup lang="ts">
const workspace = useWorkspace()
const user = useUser()
</script>
