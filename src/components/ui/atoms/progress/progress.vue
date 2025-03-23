<template>
    <div :class="cn('h-full flex justify-end items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out')"
        :style="{ width: `${progress}%` }">
        <span :class="cn('text-md text-white font-medium pr-2')">{{ progress }}%</span>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib';

defineProps<{
    progress: number;
}>();
</script>
