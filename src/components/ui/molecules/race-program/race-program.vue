<template>
  <div
    :class="
      cn('w-full', {
        'lg:w-1/2': results.length,
      })
    "
  >
    <div :class="cn('font-bold bg-blue-400 p-2 rounded border border-black')">
      <Typography variant="h5" :class="cn('text-white text-center')"
        >Program</Typography
      >
    </div>
    <div :class="cn('mt-3', 'lg:m-0')">
      <div
        :class="
          cn(
            'grid grid-cols-1 lg:grid-cols-1 gap-2 overflow-y-scroll max-h-[525px]',
          )
        "
      >
        <div v-for="(run, index) in schedule" :key="index">
          <Typography
            variant="lg"
            weight="semibold"
            :class="cn('bg-red-400 text-center mb-1 p-2 rounded')"
          >
            {{ `${index + 1}ST Lap - ${run.distance}m` }}
          </Typography>
          <Table :columns="scheduleColumns" :data="run.horses" />
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
import type { Schedule } from '@/types'

import { cn } from '@/lib'

const store = useStore()

const schedule = computed(
  () => store.getters['horseRace/allSchedules'],
) as unknown as Schedule[]
const results = computed(() => store.getters['horseRace/raceResults'])

// Define table columns
const scheduleColumns = ['position', 'name']
</script>
