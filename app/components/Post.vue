<template>
  <div class="bg-white shadow rounded-md flex flex-col pt-4 max-w-screen-md mx-auto">
    <div class="border-b border-gray-200 pb-2 px-4 mb-2 flex justify-between items-center">
      <h3 class="text-black text-lg font-bold">{{ post.author }}</h3>
      <p class="text-sm text-gray-300">{{ postTime }}</p>
    </div>
    <p class="text-md py-3 px-4">
      {{ post.content }}
    </p>
    <ul class="grid grid-cols-2 text-md font-bold text-gray-500 mt-3 border-t border-gray-200">
      <li
        class="border-r border-gray-200 py-3 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition rounded-bl"
        :class="post.userLike ? 'text-blue-500' : 'text-gray-500'"
        @click="likeSend(post.pubKey)"
      >
        <Icon name="ant-design:like-filled" class="mr-2" />Like <span class="text-gray-300 text-xs ml-2">({{ post.likeCount }})</span>
      </li>
      <li class="py-3 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition rounded-br">
        <Icon name="material-symbols:add-comment" class="mr-2" />Comment
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ToPost from '~~/mappers/ToPost'
import { useTimeAgo } from '@vueuse/core'
import useSendLike from '~~/api/useSendLike'
import useSendUnlike from '~~/api/useSendUnlike';

const sendLike = useSendLike()
const sendUnlike = useSendUnlike()

const props = defineProps({
  post: {
    type: Object as PropType<ReturnType<typeof ToPost>>,
    default: () => ({}),
  },
})

const postTime = useTimeAgo(new Date(props.post.createdAt * 1000))

const likeSend = async (pubKey: string) => {
  try {
    if (props.post.userLike) {
      await sendUnlike.postUnlike(pubKey)
    } else {
      await sendLike.postLike(pubKey)
    }
  }
  catch (e) {
    console.log(e)
  }
}
</script>
