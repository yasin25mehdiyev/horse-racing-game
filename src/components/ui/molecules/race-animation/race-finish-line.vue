<template>
    <div :class="cn('flex')">
        <div :class="cn('w-1 bg-red-500 border-l border-red-600')" :style="{ height: `${horsesLength * 48}px` }"></div>

        <div :class="cn('w-10 flex items-center justify-center')">
            <span :class="cn('[writing-mode:vertical-rl] font-bold text-red-600')">FINISH</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib'

defineProps<{
    horsesLength: number
}>()
</script>
