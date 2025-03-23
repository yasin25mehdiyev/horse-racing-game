<template>
    <div :class="cn('w-12 bg-green-600 text-white')">
        <div v-for="horse in horses" :key="horse.id"
            :class="cn('h-12 flex items-center justify-center border-b border-dashed border-gray-300')">
            <Typography variant="h6" color="base" weight="bold">{{ horse.id }}</Typography>
        </div>
    </div>
</template>

<script setup lang="ts">
// Components
import { Typography } from '@/components/ui/atoms/typography';

// Types and Utilities
import type { Horse } from '@/types';
import { cn } from '@/lib';

defineProps<{
    horses: Horse[]
}>();
</script>
