<template>
    <div v-for="(horse, index) in horses" :key="`divider-${horse.id}`"
        :class="cn('absolute w-full border-b border-dashed border-gray-500')"
        :style="{ top: `${(index + 1) * HORSE_LANE_HEIGHT - 1}px` }"></div>
</template>

<script setup lang="ts">
// Types and Utilities
import type { Horse } from '@/types';
import { cn, HORSE_LANE_HEIGHT } from '@/lib';

defineProps<{
    horses: Horse[]
}>();
</script>
