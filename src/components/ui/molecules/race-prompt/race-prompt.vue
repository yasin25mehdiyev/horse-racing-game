<template>
    <div :class="cn('flex flex-col items-center justify-center h-full')">
        <div :class="cn('text-center p-6 border-2 border-black rounded bg-gray-100 w-full max-w-lg')">
            <Typography variant="h4" weight="bold" color="success" :class="cn('mb-4')">
                {{ title }}
            </Typography>

            <div :class="cn('mb-6')">
                <Typography variant="lg" weight="bold" :class="cn('mb-2')">
                    {{ primaryText }}
                </Typography>
                <Typography color="secondary">
                    {{ secondaryText }}
                </Typography>
            </div>

            <Button v-if="buttonText" variant="success" @click="$emit('button-click')"
                :class="cn('px-6 py-3 font-bold')">
                {{ buttonText }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/atoms/button'
import { Typography } from '@/components/ui/atoms/typography'

import { cn } from '@/lib'

defineProps<{
    title: string
    primaryText: string
    secondaryText: string
    buttonText?: string
}>()

defineEmits(['button-click'])
</script>
