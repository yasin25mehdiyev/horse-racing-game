<template>
  <footer :class="cn('border-t py-4 mt-auto')">
    <div :class="cn('container mx-auto text-center text-sm text-muted-foreground')">
      <slot></slot>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { cn } from '@/lib';
</script>
