<template>
  <div v-if="!isFinished" :class="cn('h-full', 'lg:mx-4')">
    <div :class="cn('relative border-2 border-black rounded p-2 w-full')">
      <div :class="cn('flex')">
        <RaceLaneNumbers :horses="currentHorses" />

        <div :class="cn('flex-grow relative')" ref="raceTrackRef">
          <RaceLaneDividers :horses="currentHorses" />
          <RaceHorseElements :horses="currentHorses" />
          <div :class="cn(
            'absolute -bottom-8 w-full text-center font-semibold mt-2 text-red-600',
          )
            ">
            {{ currentRaceTitle }}
          </div>
        </div>

        <RaceFinishLine :horsesLength="currentHorsesLength" />
      </div>
    </div>
  </div>
  <RacePrompt v-else title="Race Finished!" primaryText="All 6 races have been completed."
    secondaryText="Check the results tab to see the final standings." buttonText="Race Again"
    @button-click="restartRace" />
</template>

<script setup lang="ts">
// Components
import { RacePrompt } from '@/components/ui/molecules/race-prompt';
import RaceLaneNumbers from '@/components/ui/molecules/race-animation/race-lane-numbers.vue';
import RaceLaneDividers from '@/components/ui/molecules/race-animation/race-lane-dividers.vue';
import RaceHorseElements from '@/components/ui/molecules/race-animation/race-horse-elements.vue';
import RaceFinishLine from '@/components/ui/molecules/race-animation/race-finish-line.vue';

// Composables
import { useRaceAnimation } from '@/composables';

// Utilities
import { cn } from '@/lib';

// useRaceAnimation Composable
const {
  raceTrackRef,
  isFinished,
  currentHorses,
  currentHorsesLength,
  currentRaceTitle,
  restartRace
} = useRaceAnimation();
</script>
