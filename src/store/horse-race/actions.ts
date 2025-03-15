import { type ActionTree } from 'vuex'
import { type AppState } from './state'
import { MutationTypes } from './mutation-types'
import type { Horse, Schedule } from '@/types'

import { distances } from "@/lib"

export const actions: ActionTree<AppState, unknown> = {
  generateHorses({ commit, state }) {
    const horses = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      color: state.colors[i % state.colors.length],
      condition: Math.floor(Math.random() * 100) + 1,
    }))
    commit(MutationTypes.SET_HORSES, horses)
    commit(MutationTypes.SET_GENERATED, true)
  },
  generateSchedule({ commit, state }) {
    const schedule: Schedule[] = []
    
    for (let i = 0; i < distances.length; i++) {
      const selectedHorses = state.horses
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
      schedule.push({
        distance: distances[i],
        horses: selectedHorses,
      })
    }
    commit(MutationTypes.SET_SCHEDULE, schedule)
    commit(MutationTypes.SET_GENERATED, true)
  },
  addRunResultWithFinishTimes(
    { state, commit },
    { runIndex, resultHorses }: { runIndex: number; resultHorses: Horse[] },
  ) {
    const results = [...(state.results || [])]
    results[runIndex] = resultHorses.map(horse => ({
      ...horse,
      finishTime: horse.finishTime,
    }))

    commit(MutationTypes.SET_RUN_RESULT_WITH_FINISH_TIMES, results)
  },
  setRaceFinished({ commit }) {
    commit(MutationTypes.SET_FINISHED, true)
  },
  startRace({ state, commit }) {
    if (!state.isGenerated) return
    if (!state.isRunning) {
      commit(MutationTypes.SET_RUNNING, true)
      commit(MutationTypes.SET_PAUSED, false)
    } else if (!state.isPaused) {
      commit(MutationTypes.SET_PAUSED, true)
    } else {
      commit(MutationTypes.SET_PAUSED, false)
    }
  },
  stopRace({ commit }) {
    commit(MutationTypes.SET_RUNNING, false)
    commit(MutationTypes.SET_PAUSED, false)
  }
}
