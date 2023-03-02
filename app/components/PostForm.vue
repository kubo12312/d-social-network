<template>
  <div v-if="workspace.fullySignedIn" class="max-w-screen-md bg-violet-50 rounded-2xl flex px-5 p-4">
    <div class="bg-blue-400 h-12 w-12 rounded-full shrink-0 mr-5"></div>

    <div class="w-full flex flex-col">
      <textarea
        v-model="postValue"
        type="text"
        placeholder="What's on your mind"
        class="bg-transparent text-gray-700 placeholder:text-zinc-500 h-20 text-base w-full focus:outline-0"
      />
      <span class="limiter text-gray-400 text-xs ml-auto mt-1">{{ charactersLeft }} / 1024</span>
      <Button class="mt-5 w-1/4 ml-auto" text="Post" @click.prevent="submitPost" />
    </div>
  </div>
  <div v-if="loading" class="absolute inset-0 bg-gray-300 bg-opacity-50 w-full h-full text-center">
    <Icon name="eos-icons:loading" class="text-7xl mt-20" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSendPost from '~~/api/useSendPost'

const workspace = useWorkspace()
const user = useUser()
const postValue = ref('')
const sendPost = useSendPost()
const loading = ref(false)

const charactersLeft = computed(() => 1024 - postValue.value.length)

const submitPost = async () => {
  try {
    loading.value = true
    await sendPost.send(postValue.value, user.userName!)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
    postValue.value = ''
  }
}
</script>
