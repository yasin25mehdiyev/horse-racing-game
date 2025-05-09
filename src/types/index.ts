// Horse and Schedule Types
type Horse = {
  id: number
  name: string
  condition: number
  color: string
  time: number
}

type Schedule = {
  horses: Horse[]
  distance: number
}

export type { Horse, Schedule };
