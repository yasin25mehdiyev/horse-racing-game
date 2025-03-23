<template>
    <div :class="cn('flex flex-col justify-center items-center h-screen bg-gray-900')">
        <ProgressBarIndicator title="Loading..." :progress="progress" :message="loadingMessage" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';

// Components
import { ProgressBarIndicator } from '@/components/ui/molecules/progress-indicator';

// Utilities
import { cn } from '@/lib';

// Refs
const progress = ref<number>(0);
const intervalId = ref<number | null>(null);
const loadingMessage = ref<string>('Starting up...');

// Computed loading message based on progress
const currentMessage = computed<string>(() => {
    if (progress.value < 20) return 'Initializing...';
    if (progress.value < 40) return 'Loading resources...';
    if (progress.value < 60) return 'Preparing content...';
    if (progress.value < 80) return 'Almost there...';
    if (progress.value < 100) return 'Finalizing...';
    return 'Complete!';
});

// Methods
const startProgress = (): void => {
    // Clear any existing interval
    if (intervalId.value) clearInterval(intervalId.value);

    // Set new interval to increment progress
    intervalId.value = window.setInterval(() => {
        if (progress.value < 100) {
            progress.value += 10;
            loadingMessage.value = currentMessage.value;
        } else {
            // Stop the interval when progress reaches 100%
            if (intervalId.value) {
                clearInterval(intervalId.value);
                intervalId.value = null;
            }
        }
    }, 300);
};

// Lifecycle hooks
onMounted(() => {
    // Small delay before starting to show the initial state
    setTimeout(() => startProgress(), 200);
});

onBeforeUnmount(() => {
    // Clean up interval when component is unmounted
    if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
    }
});
</script>
