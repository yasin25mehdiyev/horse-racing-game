<template>
  <div :class="containerClasses">
    <component :is="currentComponent" v-bind="componentProps" />
  </div>
</template>
;
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

// Components
import { RaceAnimation } from '@/components/ui/molecules/race-animation';
import { RacePrompt } from '@/components/ui/molecules/race-prompt';

// Utilities
import { cn } from '@/lib';

const store = useStore();

// Store state
const isGenerated = computed<boolean>(() => store.getters['horseRace/isGenerated']);

// Container classes with conditional logic
const containerClasses = computed<string>(() =>
  cn('md:w-1/2', {
    'lg:w-4/6': isGenerated.value,
  }),
);

// UI logic
const currentComponent = computed(() => isGenerated.value ? RaceAnimation : RacePrompt);

const componentProps = computed(() => {
  if (isGenerated.value) return {};

  return {
    title: "Ready to Race?",
    primaryText: "No races have been generated yet.",
    secondaryText: "Please, click generate horses from generate button and then start race",
  }
});
</script>
