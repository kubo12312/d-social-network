<template>
    <div class="bg-gray-900 h-full pl-10 pr-5 py-10 flex flex-col">
        <ul class="space-y-4">
            <li v-for="item in sidebarItems" :key="item.name" class="flex items-center">
                <Icon :name="item.icon" class="mr-4 text-blue-400 text-2xl" />
                <router-link :to="item.link" class="text-white hover:text-gray-300 text-xl transition">
                    {{ item.name }}
                </router-link>
            </li>
        </ul>
        <div class="h-1 w-full bg-gray-100 rounded-md mt-8"></div>
        <SignIn class="mt-auto" />
    </div>
</template>

<script setup lang="ts">
const sidebarItems = ref([
    {
        name: 'Home',
        icon: 'material-symbols:home-outline',
        link: '/',
    },
    {
        name: 'Profile',
        icon: 'ant-design:user',
        link: '/profile',
    },
])
</script>
