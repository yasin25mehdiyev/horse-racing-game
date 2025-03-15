<template>
    <div :class="cn('lg:w-2/5', {
        'lg:w-1/5': isGenerated
    })">
        <div :class="cn('font-bold bg-yellow-400 p-2 rounded border border-black text-center')">
            <Typography variant="h5" :class="cn('text-white')">Horse List (1-20)</Typography>
        </div>
        <div :class="cn('mt-3', 'lg:m-0')">
            <div :class="cn('max-h-[525px] overflow-y-scroll')" v-if="sortedHorses.length > 0">
                <Table :columns="columns" :data="sortedHorses" />
            </div>
            <div v-else :class="cn('text-center')">
                Please, click generate horses from generate button
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Table } from '@/components/ui/atoms/table'
import { Typography } from '@/components/ui/atoms/typography'
import type { Horse } from '@/types'

import { cn } from '@/lib'

const store = useStore()

const isGenerated = computed<boolean>(() => store.getters['horseRace/isGenerated'])
const horses = computed(() => store.getters['horseRace/allHorses'] as Horse[])

const sortedHorses = computed(() => {
    return horses.value.slice().sort((a: Horse, b: Horse) => a.id - b.id)
})

// Define table columns
const columns = ['name', 'color', 'condition']
</script>
