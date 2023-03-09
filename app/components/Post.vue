<template>
  <div class="flex py-5 px-4 max-w-screen-md border-b border-b-blue-400 border-opacity-50 last:border-0">
    <SanityImage :image="post.userImage" :width="48" :height="48" class="h-12 w-12" />

    <div class="ml-5">
      <div class="mb-2 flex items-center">
        <h3 class="text-zinc-600 text-md font-bold cursor-pointer" @click="toProfile(post.creatorPubKey)">
          {{ post.author }}
        </h3>
        <p class="text-xs text-zinc-500 ml-4">{{ postTime }}</p>
      </div>
      <p class="text-sm text-zinc-500">
        {{ post.content }}
      </p>
      <ul class="text-lg font-bold flex space-x-6 text-blue-500 mt-5">
        <li class="flex items-center justify-center cursor-pointer transition" @click="likeSend(post.pubKey)">
          <Icon v-if="isLiked" name="ant-design:like-filled" />
          <Icon v-else name="ant-design:like-outlined" />
          <span class="text-sm ml-1">{{ post.likeCount }}</span>
        </li>
        <li class="flex items-center justify-center cursor-pointer transition">
          <Icon name="bx:comment" />
          <span class="text-sm ml-1">{{ post.commentCount }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToPost from '~~/mappers/ToPost'
import { useTimeAgo } from '@vueuse/core'
import useSendLike from '~~/api/useSendLike'
import useSendUnlike from '~~/api/useSendUnlike'
import { PublicKey } from '@solana/web3.js'

const router = useRouter()

const workspace = useWorkspace()
const sendLike = useSendLike()
const sendUnlike = useSendUnlike()

const props = defineProps({
  post: {
    type: Object as PropType<ReturnType<typeof ToPost>>,
    default: () => ({}),
  },
})

const postTime = useTimeAgo(new Date(props.post.createdAt * 1000))

const isLiked = computed(() =>
  workspace?.wallet?.publicKey
    ? props.post?.likers?.some((publicKey: PublicKey) => publicKey.equals(workspace?.wallet?.publicKey))
    : false,
)

const likeSend = async (pubKey: string) => {
  try {
    if (isLiked.value) {
      await sendUnlike.postUnlike(pubKey)
    } else {
      await sendLike.postLike(pubKey)
    }
  } catch (e) {
    console.log(e)
  }
}

const toProfile = (pubKey: string) => {
  if (pubKey === workspace.wallet.publicKey.toBase58()) {
    router.push('/my-profile')
    return
  }
  router.push(`/profile/${pubKey}`)
}
</script>
