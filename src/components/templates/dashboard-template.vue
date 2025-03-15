<template>
  <div :class="cn('flex flex-col min-h-screen bg-background ')">
    <Header :class="cn('w-full flex justify-between items-center')">
      <Typography as="h4" variant="h4"> Horse Racing </Typography>
      <div :class="cn('flex space-x-2')" v-if="!isFinished">
        <Button variant="default" size="sm" @click="handleGenerate"
          :disabled="isRunning | isGenerated">Generate</Button>
        <Button variant="success" size="sm" @click="handleStartOrStop" :disabled="!isGenerated">{{ !isRunning ? 'Start' : 'Stop' }}</Button>
      </div>
    </Header>

    <main :class="cn('container')">
      <slot></slot>
    </main>

    <Footer> &copy; Horse Racing Application {{ getCurrentDate() }} </Footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import { Button } from '@/components/ui/atoms/button'
import { Header } from '@/components/ui/atoms/header'
import { Footer } from '@/components/ui/atoms/footer'
import { Typography } from '@/components/ui/atoms/typography'

import { cn, getCurrentDate } from '@/lib'

const store = useStore();

const isRunning = computed(() => store.getters['horseRace/isRunning']);
const isGenerated = computed(() => store.getters['horseRace/isGenerated']);
const isFinished = computed(() => store.getters['horseRace/isFinished']);

const handleGenerate = () => {
  store.dispatch("horseRace/generateHorses");
  store.dispatch("horseRace/generateSchedule");
};

const handleStartOrStop = () => {
  if (isRunning.value) store.dispatch("horseRace/stopRace");
  else store.dispatch("horseRace/startRace");
};
</script>
