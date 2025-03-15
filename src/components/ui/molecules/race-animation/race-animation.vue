<template>
  <div v-if="!isFinished" :class="cn('h-full', 'lg:mx-4')">
    <div :class="cn('relative border-2 border-black rounded p-2 w-full')">
      <div :class="cn('flex')">
        <RaceLaneNumbers :horses="currentRun?.horses || []" />

        <div :class="cn('flex-grow relative')" ref="raceTrackRef">
          <RaceLaneDividers :horses="currentRun?.horses || []" />
          <RaceHorseElements :horses="currentRun?.horses || []" />
          <div :class="cn('absolute -bottom-8 w-full text-center font-semibold mt-2 text-red-600')">
            {{ `${currentRunIndex + 1}.st Lap ${currentRun?.distance}m` }}
          </div>
        </div>

        <RaceFinishLine :horsesLength="currentRun?.horses.length || 0" />
      </div>
    </div>
  </div>
  <RacePrompt v-else title="Race Finished!" primaryText="All 6 races have been completed."
    secondaryText="Check the results tab to see the final standings." buttonText="Race Again"
    @button-click="restartRace" />
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { useStore } from 'vuex'
import gsap from 'gsap'
import type { Horse, Schedule } from '@/types'

import { RacePrompt } from '@/components/ui/molecules/race-prompt'
import RaceLaneNumbers from '@/components/ui/molecules/race-animation/race-lane-numbers.vue'
import RaceLaneDividers from '@/components/ui/molecules/race-animation/race-lane-dividers.vue'
import RaceHorseElements from '@/components/ui/molecules/race-animation/race-horse-elements.vue'
import RaceFinishLine from '@/components/ui/molecules/race-animation/race-finish-line.vue'

import { cn } from '@/lib'

const store = useStore()

const currentRunIndex = ref<number>(0)
const currentRun = computed<Schedule | undefined>(
  () => store.getters['horseRace/allSchedules'][currentRunIndex.value],
)
const isFinished = computed<boolean>(
  () => store.getters['horseRace/isFinished'],
)

const raceTrackRef = ref<HTMLElement | null>(null)
let timeline: gsap.core.Timeline | null = null
const isAnimating = ref<boolean>(false)

const startRace = async () => {
  if (isAnimating.value) return

  isAnimating.value = true
  const run = currentRun.value
  if (run) {
    try {
      const finishTimes: number[] = await animateRun(run.horses, run.distance)

      const resultHorses: Horse[] = run.horses.map((horse, index) => ({
        ...horse,
        finishTime: finishTimes[index],
      }))

      store.dispatch('horseRace/addRunResultWithFinishTimes', {
        runIndex: currentRunIndex.value,
        resultHorses,
      })

      currentRunIndex.value += 1

      if (currentRunIndex.value < 6) {
        nextTick(() => {
          resetHorsesPosition()
          startRace()
        })
      } else store.dispatch('horseRace/setRaceFinished', true)
    } catch (error: unknown) {
      console.error('Error during race animation:', error)
    } finally {
      isAnimating.value = false
    }
  }
}

const resetHorsesPosition = () => {
  const horses = document.querySelectorAll('.horse-element span')
  horses.forEach(horse => {
    gsap.set(horse, { left: '0px' })
  })
}

onMounted(() => setTimeout(resetHorsesPosition, 100))

const getEndPosition = () => {
  if (raceTrackRef.value) {
    const raceTrackRect = raceTrackRef.value.getBoundingClientRect()
    return raceTrackRect.width - 30
  }
  return 300
}

const animateRun = (horses: Horse[], distance: number) => {
  return new Promise<number[]>(resolve => {
    const finishTimes: number[] = []
    timeline = gsap.timeline({
      onComplete: () => resolve(finishTimes),
    })

    const endPosition = getEndPosition()
    const horseElements = document.querySelectorAll('.horse-element span')

    horses.forEach((horse, index) => {
      const baseSpeed = horse.condition === 1 ? 80 :
        horse.condition === 2 ? 65 : 50
      const duration = distance / (baseSpeed + Math.random() * 20)
      finishTimes.push(duration)

      if (horseElements[index]) {
        timeline?.to(
          horseElements[index],
          {
            duration,
            left: `${endPosition}px`,
            ease: 'linear',
          },
          0,
        )
      }
    })
  })
}

const stopRace = () => {
  if (timeline) {
    timeline.pause()
    resetHorsesPosition()
    isAnimating.value = false
  }
}

const restartRace = () => window.location.reload()

watch(
  () => store.state.horseRace.isRunning,
  newValue => {
    if (newValue) startRace()
    else stopRace()
  },
)
</script>
