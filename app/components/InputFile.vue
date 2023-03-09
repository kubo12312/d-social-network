<template>
  <div>
    <label :for="`${name}_id`" class="text-gray-300 block mb-2 uppercase text-sm">{{ label }}</label>
    <input
      type="file"
      :id="`${name}_id`"
      :name="name"
      class="bg-transparent shadow appearance-none border border-gray-500 rounded-full w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      @input="$emit('imageChange', ($event.target as HTMLInputElement).files)"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['imageChange'])

defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})
</script>
