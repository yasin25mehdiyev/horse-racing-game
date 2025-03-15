import { type MutationTree } from 'vuex'
import { type AppState } from './state'
import { MutationTypes } from './mutation-types'
import type { Horse, Schedule } from '@/types'

export const mutations: MutationTree<AppState> = {
  [MutationTypes.SET_HORSES](state, horses: Horse[]) {
    state.horses = horses
  },
  [MutationTypes.SET_SCHEDULE](state, schedules: Schedule[]) {
    state.schedule = schedules
  },
  [MutationTypes.SET_RUN_RESULT_WITH_FINISH_TIMES](state, results: Horse[][]) {
    state.results = results
  },
  [MutationTypes.SET_GENERATED](state, isGenerated: boolean) {
    state.isGenerated = isGenerated
  },
  [MutationTypes.SET_FINISHED](state, isFinished: boolean) {
    state.isFinished = isFinished
  },
  [MutationTypes.SET_RUNNING](state, isRunning: boolean) {
    state.isRunning = isRunning
  },
  [MutationTypes.SET_PAUSED](state, isPaused: boolean) {
    state.isPaused = isPaused
  },
}
