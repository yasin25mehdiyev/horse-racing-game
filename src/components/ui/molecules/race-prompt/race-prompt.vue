<template>
    <div :class="cn('flex flex-col h-full w-full space-x-4')">
        <div :class="cn('flex flex-col justify-center text-center p-6 border-2 border-black rounded bg-gray-100 w-full h-full')">
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

            <Button v-if="showButton" variant="success" @click="handleButtonClick" :class="cn('px-6 py-3 font-bold')">
                {{ buttonText }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Components
import { Button } from '@/components/ui/atoms/button';
import { Typography } from '@/components/ui/atoms/typography';

// Utilities
import { cn } from '@/lib';

const props = defineProps<{
    title: string
    primaryText: string
    secondaryText: string
    buttonText?: string
}>();

const emit = defineEmits(['button-click']);

// UI logic
const showButton = computed<boolean>(() => !!props.buttonText);

// Event handlers
const handleButtonClick = () => emit('button-click');
</script>
