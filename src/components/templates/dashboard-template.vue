<template>
  <ProgressBarLoader v-if="isLoading" />
  <MainLayout v-else>
    <Header :class="cn('w-full flex justify-between items-center')">
      <Typography as="h4" variant="h4">Horse Racing</Typography>
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

    <main :class="cn('container mt-4')">
      <slot></slot>
    </main>

    <Footer> &copy; Horse Racing Application {{ copyrightYear }} </Footer>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

// Components
import { Button } from '@/components/ui/atoms/button';
import { Header } from '@/components/ui/atoms/header';
import { Footer } from '@/components/ui/atoms/footer';
import { Typography } from '@/components/ui/atoms/typography';
import { ProgressBarLoader } from '@/components/ui/organisms/progress-loader';

// Templates
import MainLayout from './main-layout-template.vue';

// Utilities
import { cn, getCurrentDate } from '@/lib';

// Refs
const isLoading = ref<boolean>(true);

// Store state
const store = useStore();

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

// Lifecycle hooks
onMounted(() => setTimeout(() => isLoading.value = false, 6000)); // 6 seconds (enough time for progress bar to reach 100%)
</script>
