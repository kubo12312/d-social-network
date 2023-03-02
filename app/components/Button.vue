<template>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-medium font-lg py-1.5 px-6 rounded-full">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>
