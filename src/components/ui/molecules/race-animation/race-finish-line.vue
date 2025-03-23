<template>
    <div :class="cn('flex')">
        <div :class="cn('w-1 bg-red-500 border-l border-red-600')" :style="finishLineStyle"></div>

        <div :class="cn('w-10 flex items-center justify-center')">
            <span :class="cn('[writing-mode:vertical-rl] font-bold text-red-600')">FINISH</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Utilites
import { cn, HORSE_LANE_HEIGHT } from '@/lib';

const props = defineProps<{
    horsesLength: number
}>();

// UI style logic
const finishLineStyle = computed(() => ({
    height: `${props.horsesLength * HORSE_LANE_HEIGHT}px`
}));
</script>
