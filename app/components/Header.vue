<template>
  <div class="bg-white shadow py-2 px-3 flex justify-between items-center sticky top-0 mb-4">
    <h1>Logo</h1>
    <ClientOnly>
      <WalletMultiButton />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue'
</script>
