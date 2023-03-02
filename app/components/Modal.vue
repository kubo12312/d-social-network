<template>
  <div class="w-full h-full absolute inset-0 bg-gray-900 bg-opacity-60 z-40"></div>
  <div
    ref="modalWindow"
    class="max-w-lg w-full bg-gray-900 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 z-50 flex flex-col"
  >
    <h2 class="text-white text-lg text-center font-semibold border-b border-gray-500 pb-4">Create Account</h2>

    <div class="space-y-4 mt-5 px-6">
      <Input v-model:value="userName" label="User name" name="user-name" type="text" :required="true" />

      <Input v-model:value="userImage" label="User Image" name="user-image" type="file" />
    </div>

    <Button text="Create" class="mt-6 w-1/3 mx-auto" @click="$emit('submit', { name: userName })" />

    <Icon
      name="material-symbols:close"
      class="absolute top-4 right-4 text-white text-2xl cursor-pointer"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close', 'submit'])

const modalWindow = ref(null)
const userName = ref('')
const userImage = ref('')

onClickOutside(modalWindow, () => {
  emit('close')
})
</script>
