<template>
    <div :class="cn('!mt-8', 'lg:flex lg:w-2/5 lg:!m-0')">
        <RaceProgram />
        <RaceResults />
    </div>
</template>

<script setup lang="ts">
import { RaceProgram } from '@/components/ui/molecules/race-program'
import { RaceResults } from '@/components/ui/molecules/race-results'

import { cn } from '@/lib'
</script>
