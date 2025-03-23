import { type GetterTree } from 'vuex'
import { type AppState } from './state'

// Getters
export const getters: GetterTree<AppState, unknown> = {
  allHorses: state => state.horses,
  allSchedules: state => state.schedule,
  colors: state => state.colors,
  raceResults: state => state.results,
  isGenerated: state => state.isGenerated,
  isFinished: state => state.isFinished,
  isRunning: state => state.isRunning,
  isPaused: state => state.isPaused,
}
