import type { Horse, Schedule } from '@/types'

import { colors } from "@/lib"

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

const state: AppState = {
  horses: [],
  schedule: [],
  results: [],
  colors,
  isGenerated: false,
  isFinished: false,
  isRunning: false,
  isPaused: false,
}

export { state }
export type { AppState }
