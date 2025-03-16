import { test, expect } from '@playwright/test'
import { generateHorses, getStartRaceButton, getHorsePositions } from '../helpers'

test.describe('Home View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display all major components', async ({ page }) => {
    await expect(page.getByText(/horse list/i)).toBeVisible()
    await expect(page.getByText(/ready to race?/i)).toBeVisible()

    const horseList = await page.$('.font-bold.bg-yellow-400')
    expect(horseList).not.toBeNull()
  })

  test('should generate horses when clicking generate button', async ({
    page,
  }) => {
    await generateHorses(page)

    await expect(
      page.getByText(/please, click generate horses from generate button/i),
    ).not.toBeVisible()

    const horseName = await page
      .locator('table')
      .first()
      .locator('tr')
      .nth(1)
      .textContent()
    expect(horseName).not.toBe('')
  })

  test('should start and stop the race correctly', async ({ page }) => {
    await generateHorses(page)
  
    const startButton = await getStartRaceButton(page)
    await startButton.click()
    await page.waitForTimeout(1000)
    
    await expect(page.locator('.horse-element span[style*="left"]').first()).toBeVisible()
    await getHorsePositions(page)
    
    const stopButton = page.getByRole('button', { name: /stop/i })
    await stopButton.click()
    await page.waitForTimeout(1000)
    
    const stoppedPositions = await getHorsePositions(page)
    await page.waitForTimeout(1000)
    const finalPositions = await getHorsePositions(page)
    
    expect(stoppedPositions).toEqual(finalPositions)
    
    await startButton.click()
    await page.waitForTimeout(1000)
    const restartedPositions = await getHorsePositions(page)
    
    expect(restartedPositions).not.toEqual(stoppedPositions)
  })
})
