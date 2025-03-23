// Function to get the current date
const getCurrentDate = (): string => {
  const date = new Date()
  const currentDay = date.getDate()
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()

  const getFormattedMonth = (month: number) =>
    month < 10 ? `0${month}` : month

  return `${currentDay}.${getFormattedMonth(currentMonth)}.${currentYear}`
}

export { getCurrentDate };
