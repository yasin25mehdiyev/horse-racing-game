<template>
    <div v-for="horse in horses" :key="horse.id" :class="cn('h-12 relative horse-element')">
        <span :style="horseIconStyle" :class="cn('text-2xl absolute left-0 top-1/2 -translate-y-1/2 z-10')">🐎</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Types and Utilities
import type { Horse } from '@/types';
import { cn } from '@/lib';

defineProps<{
    horses: Horse[]
}>();

// Style object for the horse icon
const horseIconStyle = computed(() => ({
    transform: 'scaleX(-1)'
}));
</script>
