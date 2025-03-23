<template>
  <component :is="props.as" :class="classes">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { cn } from '@/lib';

const typographyVariants = {
  variant: {
    display: 'text-7xl',
    h1: 'text-6xl',
    h2: 'text-5xl',
    h3: 'text-4xl',
    h4: 'text-3xl',
    h5: 'text-2xl',
    h6: 'text-xl',
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
    xs: 'text-xs',
  },
  color: {
    base: 'text-white',
    primary: 'text-primary',
    secondary: 'text-gray-500',
    tertiary: 'text-tertiary',
    quaternary: 'text-quaternary',
    success: 'text-green-500',
    error: 'text-red-500',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
};

const typographyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
type TypographyTag = typeof typographyTags[number];

interface Props {
  as?: TypographyTag;
  variant?: keyof typeof typographyVariants.variant;
  color?: keyof typeof typographyVariants.color;
  weight?: keyof typeof typographyVariants.weight;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  variant: 'md',
  color: 'primary',
  weight: 'normal',
  class: '',
});

const classes = computed(() => {
  return cn(
    typographyVariants.variant[props.variant],
    typographyVariants.color[props.color],
    typographyVariants.weight[props.weight],
    props.class
  );
});
</script>
