<template>
    <div :class="cn('w-12 bg-green-600 text-white')">
        <div v-for="horse in horses" :key="horse.id"
            :class="cn('h-12 flex items-center justify-center border-b border-dashed border-gray-300 font-bold')">
            {{ horse.id }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'

import { cn } from '@/lib'

defineProps<{
    horses: Horse[]
}>()
</script>
