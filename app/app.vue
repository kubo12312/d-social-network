<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import TimeAgo from 'javascript-time-ago'
import sk from 'javascript-time-ago/locale/sk'

TimeAgo.addDefaultLocale(sk)
</script>