<template>
  <div>
    <label :for="`${name}_id`" class="text-gray-300 block mb-2 uppercase text-sm"
      >{{ label }} {{ required && '*' }}</label
    >
    <input
      :type="type"
      :id="`${name}_id`"
      :name="name"
      :required="required"
      :value="value"
      class="bg-transparent shadow appearance-none border border-gray-500 rounded-full w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      @input="changeValue(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:value'])

defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
})

const changeValue = (value: string | null) => {
  emit('update:value', value)
}
</script>
