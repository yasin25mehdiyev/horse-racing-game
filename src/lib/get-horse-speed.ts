import { HorseCondition, HorseSpeed } from './enums'

// Function to get the horse speed by condition
const getHorseSpeedByCondition = (condition: number): number => {
  switch (condition) {
    case HorseCondition.EXCELLENT:
      return HorseSpeed.EXCELLENT;
    case HorseCondition.GOOD:
      return HorseSpeed.GOOD;
    default:
      return HorseSpeed.AVERAGE;
  }
}

export { getHorseSpeedByCondition };
