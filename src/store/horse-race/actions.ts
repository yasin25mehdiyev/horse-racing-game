import { type ActionTree } from 'vuex'

// Store State
import { type AppState } from './state'

// Mutation Types
import { MutationTypes } from './mutation-types'

// Types and Utilities
import type { Horse } from '@/types'
import { DISTANCES } from '@/lib'

/** Vuex actions for horse racing app */
export const actions: ActionTree<AppState, unknown> = {
  // Creates 20 horses with randomized conditions
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

  // Creates race schedule with 10 random horses per distance
  generateSchedule({ commit, state }) {
    const schedule = DISTANCES.map(distance => {
      const selectedHorses = state.horses
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)

      return {
        distance: distance,
        horses: selectedHorses,
      }
    })

    commit(MutationTypes.SET_SCHEDULE, schedule)
    commit(MutationTypes.SET_GENERATED, true)
  },

  // Stores race results with finish times
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

  // Marks all races as finished
  setRaceFinished({ commit }) {
    commit(MutationTypes.SET_FINISHED, true)
  },

  // Controls race execution (start/pause/resume)
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

  // Stops race and resets running states
  stopRace({ commit }) {
    commit(MutationTypes.SET_RUNNING, false)
    commit(MutationTypes.SET_PAUSED, false)
  },
}
