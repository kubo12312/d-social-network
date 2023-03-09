<template>
  <img v-if="image" :src="imageUrl" class="rounded-full shrink-0" />
  <div v-else :class="[width, height]" class="rounded-full shrink-0 bg-gray-100 flex items-center justify-center">
    <Icon name="ph:user" class="w-2/3 h-auto text-gray-400" />
  </div>
</template>

<script setup lang="ts">
import imageUrlBuilder from '@sanity/image-url'

const config = useRuntimeConfig()

const props = defineProps({
  width: {
    type: Number,
    default: 48,
  },
  height: {
    type: Number,
    default: 48,
  },
  image: {
    type: String,
    default: null,
  },
})

const builder = imageUrlBuilder({
  projectId: config.public.SANITY_ID,
  dataset: 'production',
})

const imageUrl = computed(() => {
  return props.image ? builder.image(props.image).width(props.width).height(props.height).url() : ''
})
</script>
