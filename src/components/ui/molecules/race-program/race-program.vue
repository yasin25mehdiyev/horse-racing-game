<template>
  <div :class="containerClasses">
    <div :class="cn('font-bold bg-blue-400 p-2 rounded border border-black')">
      <Typography variant="h5" :class="cn('text-white text-center')">Program</Typography>
    </div>
    <div :class="cn('mt-3', 'lg:m-0')">
      <div :class="cn('grid grid-cols-1 gap-2 overflow-y-scroll max-h-[525px]', 'lg:grid-cols-1')">
        <div v-for="(run, index) in schedule" :key="index">
          <Typography variant="lg" weight="semibold" :class="cn('bg-red-400 text-center mb-1 p-2 rounded')">
            {{ getLapTitle(index, run) }}
          </Typography>
          <Table :columns="scheduleColumns" :data="run.horses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

// Components
import { Table } from '@/components/ui/atoms/table';
import { Typography } from '@/components/ui/atoms/typography';

// Types and Utilities
import type { Schedule } from '@/types';
import { cn } from '@/lib';

const store = useStore();

// Store state
const schedule = computed<Schedule[]>(() => store.getters['horseRace/allSchedules']);
const results = computed<any[]>(() => store.getters['horseRace/raceResults']);

// UI logic
const containerClasses = computed<string>(() =>
  cn('w-full', {
    'lg:w-1/2': hasResults.value
  })
);

const hasResults = computed<boolean>(() => results.value.length > 0);

// Methods
const getLapTitle = (index: number, run: Schedule): string => `${index + 1}ST Lap - ${run.distance}m`;

// Define table columns
const scheduleColumns = ['position', 'name'];
</script>
