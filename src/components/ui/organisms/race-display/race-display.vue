<template>
  <div :class="cn('lg:w-2/5')">
    <RaceAnimation v-if="isGenerated" />
    <RacePrompt v-else title="Ready to Race?" primaryText="No races have been generated yet."
      secondaryText="Please, click generate horses from generate button and then start race" :class="cn('mx-4')" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import { RaceAnimation } from '@/components/ui/molecules/race-animation'
import { RacePrompt } from '@/components/ui/molecules/race-prompt'

import { cn } from '@/lib'

const store = useStore()
const isGenerated = computed(() => store.getters['horseRace/isGenerated'])
</script>
