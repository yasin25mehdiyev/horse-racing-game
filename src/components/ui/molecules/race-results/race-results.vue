<template>
    <div :class="cn('mt-5', 'lg:w-1/2 lg:m-0')" v-if="results.length">
        <div :class="cn('font-bold bg-green-400 p-2 rounded border border-black')">
            <Typography variant="h5" :class="cn('text-white text-center')">Results</Typography>
        </div>
        <div :class="cn('mt-3', 'lg:m-0')">
            <div :class="cn('grid grid-cols-1 lg:grid-cols-1 gap-2 overflow-y-scroll max-h-[525px]')">
                <div v-for="(result, index) in formattedResults" :key="index">
                    <Typography variant="lg" weight="semibold"
                        :class="cn('bg-red-400 text-center mb-1 p-2 rounded')">
                        {{ `${index + 1}ST Lap - ${schedule[index]?.distance || ''}m` }}
                    </Typography>
                    <Table :columns="resultColumns" :data="result" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Table } from '@/components/ui/atoms/table'
import { Typography } from '@/components/ui/atoms/typography'
import type { Horse, Schedule } from '@/types'

import { cn } from '@/lib'

const store = useStore()

const schedule = computed(
    () => store.getters['horseRace/allSchedules']
) as unknown as Schedule[]
const results = computed(() => store.getters['horseRace/raceResults'])

const formattedResults = computed(() => {
    if (!results.value) return []

    return results.value.map((run: Horse[]) => {
        if (!run) return []

        return [...run]
            .sort((a, b) => a.finishTime - b.finishTime)
            .map((horse, idx) => ({
                ...horse,
                position: idx + 1,
                finishTime: horse.finishTime.toFixed(2),
            }))
    })
})

// Define table columns
const resultColumns = ['position', 'name', 'finishTime']
</script>
