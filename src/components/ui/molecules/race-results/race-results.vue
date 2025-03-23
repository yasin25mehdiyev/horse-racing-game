<template>
    <div :class="cn('mt-5', 'lg:w-1/2 lg:m-0')" v-if="hasResults">
        <div :class="cn('font-bold bg-green-400 p-2 rounded border border-black')">
            <Typography variant="h5" :class="cn('text-white text-center')">Results</Typography>
        </div>
        <div :class="cn('mt-3', 'lg:m-0')">
            <div :class="cn('grid grid-cols-1 gap-2 overflow-y-scroll max-h-[525px]', 'lg:grid-cols-1')">
                <div v-for="(result, index) in formattedResults" :key="index">
                    <Typography variant="lg" weight="semibold" :class="cn('bg-red-400 text-center mb-1 p-2 rounded')">
                        {{ getLapTitle(index) }}
                    </Typography>
                    <Table :columns="resultColumns" :data="result" />
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
import type { Horse, Schedule } from '@/types';
import { cn } from '@/lib';

const store = useStore();

// Store state
const schedule = computed<Schedule[]>(() => store.getters['horseRace/allSchedules']);
const results = computed<Horse[][]>(() => store.getters['horseRace/raceResults']);

// UI logic
const hasResults = computed<boolean>(() => results.value.length > 0);

const getLapTitle = (index: number): string => `${index + 1}ST Lap - ${schedule.value[index]?.distance || ''}m`;

// Data formatting
const formattedResults = computed(() => {
    if (!results.value) return [];

    return results.value.map((run: Horse[]) => {
        if (!run) return [];

        return [...run]
            .sort((a, b) => a.time - b.time)
            .map((horse, idx) => ({
                ...horse,
                position: idx + 1,
                time: horse.time.toFixed(2),
            }));
    });
});

// Define table columns
const resultColumns = ['position', 'name', 'time'];
</script>
