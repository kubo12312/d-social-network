<template>
  <div class="border-b border-gray-200 max-w-screen-md pb-4 mb-4 flex items-start">
    <div>
      <div class="h-28 w-28 rounded-full bg-gray-100"></div>

      <h2 class="text-2xl font-bold mt-4">John Doe</h2>
      <p class="text-gray-400 text-sm mt-2">{{ workspace.wallet.publicKey.toBase58() }}</p>
    </div>
    <Button class="mt-auto ml-auto" text="Edit" />
  </div>
</template>

<script setup lang="ts">
const workspace = useWorkspace()
</script>
