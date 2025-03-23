import type { Horse, Schedule } from '@/types'

import { COLORS } from "@/lib"

// State structure for horse racing app
type AppState = {
  horses: Horse[]
  schedule: Schedule[]
  results: Horse[][]
  colors: string[]
  isGenerated: boolean
  isFinished: boolean
  isRunning: boolean
  isPaused: boolean
}

// Initial app state
const state: AppState = {
  horses: [],
  schedule: [],
  results: [],
  colors: COLORS,
  isGenerated: false,
  isFinished: false,
  isRunning: false,
  isPaused: false,
}

export { state }
export type { AppState }
