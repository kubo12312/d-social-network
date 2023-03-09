<template>
    <div class="w-full h-full flex">
        <Sidebar class="w-1/3 lg:w-1/4" />
        <div class="pb-4 w-2/3 lg:w-3/4 ml-8">
            <slot />
        </div>
    </div>
</template>