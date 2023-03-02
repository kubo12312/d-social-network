<template>
  <div>
    <ClientOnly>
      <SignInButton v-if="connected" />
      <WalletMultiButton />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import useUserStore from '~~/stores/useUserStore'

const userStore = useUserStore()

const connected = useWallet().connected

watch(connected, async (currentValue) => {
  if (!currentValue) {
    userStore.$reset()
  }
})
</script>

