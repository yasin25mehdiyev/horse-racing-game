<template>
    <div :class="cn('flex flex-col min-h-screen bg-background')">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib';
</script>
