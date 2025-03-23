<template>
    <div :class="cn('text-center')">
        <Typography variant="h6" weight="semibold" color="secondary" :class="cn('mb-4')">{{ title }}</Typography>

        <ProgressBarContainer>
            <ProgressBar :progress="progress" />
        </ProgressBarContainer>

        <Typography color="secondary" :class="cn('mt-6')">
            {{ message }}
        </Typography>
    </div>
</template>

<script setup lang="ts">
import { ProgressBar, ProgressBarContainer } from '@/components/ui/atoms/progress';
import { Typography } from '@/components/ui/atoms/typography';

import { cn } from '@/lib';

defineProps<{
    title: string;
    progress: number;
    message: string;
}>();
</script>
