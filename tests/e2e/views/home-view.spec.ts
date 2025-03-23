import { test, expect } from '@playwright/test'
import {
  generateHorses,
  getStartRaceButton,
  getHorsePositions,
} from '../helpers'

// Tests for Home view functionality
test.describe('Home View', () => {
  // Navigate to home before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(6500)
  })

  // Verifies UI elements are visible
  test('should display the correct title text during loading', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const loaderTitle = page.getByText(/loading.../i)
    await expect(loaderTitle).toBeVisible()

    // Wait for loading to complete to ensure test cleanup
    await page.waitForTimeout(6500)
    await expect(loaderTitle).not.toBeVisible()
  })

  test('should display all major components', async ({ page }) => {
    await expect(page.getByText(/Horses Ready to Race/i)).toBeVisible()
  })

  // Tests horse generation functionality
  test('should generate horses when clicking generate button', async ({
    page,
  }) => {
    await generateHorses(page)

    await expect(
      page.getByText(
        /please click the 'Generate' button to create a randomized selection of horses for the upcoming races./i,
      ),
    ).not.toBeVisible()

    const horseName = await page
      .locator('table')
      .first()
      .locator('tr')
      .nth(1)
      .textContent()
    expect(horseName).not.toBe('')
  })

  // Tests race start/stop controls
  test('should start and stop the race correctly', async ({ page }) => {
    await generateHorses(page)

    const startButton = await getStartRaceButton(page)
    await startButton.click()
    await page.waitForTimeout(1000)

    await expect(
      page.locator('.horse-element span[style*="left"]').first(),
    ).toBeVisible()
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
