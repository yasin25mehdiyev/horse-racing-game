<template>
    <div :class="cn('!mt-8', 'lg:flex lg:w-4/6 lg:!m-0')">
        <RaceProgram />
        <RaceResults />
    </div>
</template>

<script setup lang="ts">
// Components
import { RaceProgram } from '@/components/ui/molecules/race-program';
import { RaceResults } from '@/components/ui/molecules/race-results';

// Utilities
import { cn } from '@/lib';
</script>
