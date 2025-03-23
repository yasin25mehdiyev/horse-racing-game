<template>
    <div :class="containerClasses">
        <div :class="cn(
            'font-bold bg-yellow-400 p-2 rounded border border-black text-center',
        )
            ">
            <Typography variant="h5" :class="cn('text-white')">Horse List (1-20)</Typography>
        </div>
        <div :class="cn('mt-3', 'lg:m-0')">
            <div :class="cn('max-h-[525px] overflow-y-scroll')" v-if="hasHorses">
                <Table :columns="columns" :data="sortedHorses" />
            </div>

            <RacePrompt v-else :class="cn('mt-4')" title="Horses Ready to Race"
                primaryText="Your race roster is currently empty."
                secondaryText="Please click the 'Generate' button to create a randomized selection of horses for the upcoming races." />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

// Components
import { Table } from '@/components/ui/atoms/table';
import { Typography } from '@/components/ui/atoms/typography';
import { RacePrompt } from '@/components/ui/molecules/race-prompt';

// Types and Utilites
import type { Horse } from '@/types';
import { cn } from '@/lib';

const store = useStore();

// Store state
const isGenerated = computed<boolean>(
    () => store.getters['horseRace/isGenerated'],
);
const horses = computed<Horse[]>(() => store.getters['horseRace/allHorses']);

// UI logic
const hasHorses = computed<boolean>(() => sortedHorses.value.length > 0);
const sortedHorses = computed<Horse[]>(() =>
    horses.value.slice().sort((a: Horse, b: Horse) => a.id - b.id),
);

// Container classes with conditional logic
const containerClasses = computed<string>(() =>
    cn('lg:w-2/5', {
        'lg:w-1/5': isGenerated.value,
    }),
);

// Define table columns
const columns = ['name', 'color', 'condition'];
</script>
