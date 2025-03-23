import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

// Animation Library
import gsap from 'gsap'

// Types and Utilities
import type { Horse, Schedule } from '@/types'
import {
  // Consts
  DEFAULT_FINISH_LINE_OFFSET,
  FINISH_LINE_OFFSET,
  HORSE_POSITION_RESET_DELAY,
  TOTAL_LAPS,
  // Functions
  getHorseSpeedByCondition,
  // Enums
  HorseSpeed,
} from '@/lib'

const useRaceAnimation = () => {
  const store = useStore()

  // Refs and state
  const currentRunIndex = ref<number>(0)
  const raceTrackRef = ref<HTMLElement | null>(null)
  const isAnimating = ref<boolean>(false)
  let timeline: gsap.core.Timeline | null = null

  // Store state
  const currentRun = computed<Schedule | undefined>(
    () => store.getters['horseRace/allSchedules'][currentRunIndex.value],
  )
  const isFinished = computed<boolean>(
    () => store.getters['horseRace/isFinished'],
  )

  // UI computed
  const currentHorses = computed<Horse[]>(() => currentRun.value?.horses || [])
  const currentHorsesLength = computed<number>(
    () => currentRun.value?.horses.length || 0,
  )
  const currentRaceTitle = computed<string>(
    () => `${currentRunIndex.value + 1}.st Lap ${currentRun.value?.distance}m`,
  )

  // Race animation methods
  const getEndPosition = () => {
    // Default fallback value;
    if (!raceTrackRef.value) return DEFAULT_FINISH_LINE_OFFSET

    const raceTrackRect = raceTrackRef.value.getBoundingClientRect()
    return raceTrackRect.width - FINISH_LINE_OFFSET
  }

  const resetHorsesPosition = () => {
    const horses = document.querySelectorAll('.horse-element span')
    for (const horse of horses) gsap.set(horse, { left: '0px' })
  }

  const animateRun = (horses: Horse[], distance: number) => {
    return new Promise<number[]>(resolve => {
      const finishTimes: number[] = []
      timeline = gsap.timeline({
        onComplete: () => resolve(finishTimes),
      })

      const endPosition = getEndPosition()
      const horseElements = document.querySelectorAll('.horse-element span')

      horses.forEach((horse: Horse, index: number) => {
        const duration =
          distance /
          (getHorseSpeedByCondition(horse.condition) +
            Math.random() * HorseSpeed.RANDOM_FACTOR)
        finishTimes.push(duration)

        if (!horseElements[index]) return

        timeline?.to(
          horseElements[index],
          {
            duration,
            left: `${endPosition}px`,
            ease: 'linear',
          },
          0,
        )
      })
    })
  }

  const startRace = async () => {
    if (isAnimating.value) return

    isAnimating.value = true
    const run = currentRun.value

    if (!run) return

    try {
      const finishTimes: number[] = await animateRun(run.horses, run.distance)

      const resultHorses: Horse[] = run.horses.map((horse, index) => ({
        ...horse,
        time: finishTimes[index],
      }))

      store.dispatch('horseRace/addRunResultWithFinishTimes', {
        runIndex: currentRunIndex.value,
        resultHorses,
      })

      currentRunIndex.value += 1

      if (!(currentRunIndex.value < TOTAL_LAPS))
        return store.dispatch('horseRace/setRaceFinished', true)

      nextTick(() => {
        resetHorsesPosition()
        startRace()
      })
    } catch (error: unknown) {
      console.error('Error during race animation:', error)
    } finally {
      isAnimating.value = false
    }
  }

  const stopRace = () => {
    if (!timeline) return

    timeline.pause()
    resetHorsesPosition()
    isAnimating.value = false
  }

  const restartRace = () => window.location.reload()

  // Lifecycle hooks
  onMounted(() => setTimeout(resetHorsesPosition, HORSE_POSITION_RESET_DELAY))

  // Watch for race state changes
  watch(
    () => store.state.horseRace.isRunning,
    newValue => {
      if (newValue) startRace()
      else stopRace()
    },
  )

  return {
    raceTrackRef,
    currentRunIndex,
    isAnimating,
    isFinished,
    currentRun,
    currentHorses,
    currentHorsesLength,
    currentRaceTitle,
    startRace,
    stopRace,
    resetHorsesPosition,
    restartRace,
  }
}

export { useRaceAnimation };
