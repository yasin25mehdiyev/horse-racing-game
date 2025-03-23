<template>
  <div :class="cn('flex flex-col min-h-screen bg-background')">
    <Header :class="cn('w-full flex justify-between items-center')">
      <Typography as="h4" variant="h4"> Horse Racing </Typography>
      <div :class="cn('flex space-x-2')" v-if="!isFinished">
        <Button
          variant="default"
          size="sm"
          @click="handleGenerate"
          :disabled="generateButtonDisabled"
        >
          Generate
        </Button>
        <Button
          variant="success"
          size="sm"
          @click="handleStartOrStop"
          :disabled="!isGenerated"
        >
          {{ startStopButtonText }}
        </Button>
      </div>
    </Header>

    <main :class="cn('container')">
      <slot></slot>
    </main>

    <Footer> &copy; Horse Racing Application {{ copyrightYear }} </Footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

// Components
import { Button } from '@/components/ui/atoms/button';
import { Header } from '@/components/ui/atoms/header';
import { Footer } from '@/components/ui/atoms/footer';
import { Typography } from '@/components/ui/atoms/typography';

// Utilities
import { cn, getCurrentDate } from '@/lib';

const store = useStore();

// Store state
const isRunning = computed(() => store.getters['horseRace/isRunning']);
const isGenerated = computed(() => store.getters['horseRace/isGenerated']);
const isFinished = computed(() => store.getters['horseRace/isFinished']);

// UI logic
const generateButtonDisabled = computed(
  () => isRunning.value || isGenerated.value,
);
const startStopButtonText = computed(() =>
  !isRunning.value ? 'Start' : 'Stop',
);
const copyrightYear = computed(() => getCurrentDate());

// Event handlers
const handleGenerate = () => {
  store.dispatch('horseRace/generateHorses');
  store.dispatch('horseRace/generateSchedule');
};

const handleStartOrStop = () => {
  if (isRunning.value) store.dispatch('horseRace/stopRace');
  else store.dispatch('horseRace/startRace');
};
</script>
;