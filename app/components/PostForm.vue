<template>
  <div class="max-w-screen-md mx-auto">
    <h2 v-if="!connected" class="text-lg font-bold text-center">Please connect your wallet to write post</h2>
    <div v-else class="bg-white shadow rounded-md py-2 px-3 flex flex-col mb-4">
      <input
        v-model="postValue"
        type="text"
        placeholder="What's on your mind"
        class="text-gray-700 placeholder:text-gray-300 text-base h-14 w-full border-b border-gray-200 focus:outline-0"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-medium font-lg py-1.5 px-6 rounded-md ml-auto mt-3 w-1/4"
        @click.prevent="submitPost"
      >
        Post
      </button>
    </div>
  </div>
  <div v-if="loading" class="absolute inset-0 bg-gray-300 bg-opacity-50 w-full h-full text-center">
    <Icon name="eos-icons:loading" class="text-7xl mt-20" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import useSendPost from '~~/api/useSendPost'

const postValue = ref('')
const connected = useWallet().connected
const sendPost = useSendPost()
const loading = ref(false)

const submitPost = async () => {
  try {
    loading.value = true
    await sendPost.send(postValue.value)
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false
    postValue.value = ''
  }
}
</script>
