<template>
  <DashboardTemplate>
    <div :class="cn('mx-auto flex flex-col justify-between space-y-5 my-4', 'lg:flex-row lg:space-y-0')">
      <!-- Horse List -->
      <HorseList />

      <!-- Horse Animations -->
      <RaceDisplay />

      <!-- Program and Results -->
      <RaceInformation v-if="isGenerated" />
    </div>
  </DashboardTemplate>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

// Components
import { DashboardTemplate } from '@/components/templates';
import { HorseList } from '@/components/ui/organisms/horse-list';
import { RaceDisplay } from '@/components/ui/organisms/race-display';
import { RaceInformation } from '@/components/ui/organisms/race-information';

// Utilities
import { cn } from '@/lib';

const store = useStore();

// Store state
const isGenerated = computed<boolean>(() => store.getters['horseRace/isGenerated']);
</script>
