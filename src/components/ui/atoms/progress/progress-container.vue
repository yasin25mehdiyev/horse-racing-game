<template>
    <div :class="cn('h-6 w-64 border border-gray-300 rounded-full p-1 bg-white shadow-inner')">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib';
</script>
