import { Page, expect } from '@playwright/test'

const getGenerateButton = async (page: Page) => {
  const button = page.getByRole('button', { name: /generate/i })
  await expect(button).toBeVisible()
  return button
}

const getStartRaceButton = async (page: Page) => {
  const button = page.getByRole('button', { name: /start/i })
  await expect(button).toBeVisible()
  return button
}

const generateHorses = async (page: Page) => {
  const button = await getGenerateButton(page)
  await button.click()
  await expect(page.locator('table').first()).toBeVisible({ timeout: 10000 })
}

const startRace = async (page: Page) => {
  const button = await getStartRaceButton(page)
  await button.click()
}

const getHorsePositions = async (page: Page) => {
  return page.evaluate(() => {
    const horses = document.querySelectorAll('.horse-element span')
    return Array.from(horses).map(horse => {
      return parseFloat(window.getComputedStyle(horse).left)
    })
  })
}

export { getGenerateButton, getStartRaceButton, generateHorses, startRace, getHorsePositions }
