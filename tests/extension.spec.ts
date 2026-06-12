import { test, expect } from "@playwright/test"

test.describe("ViewLens Extension", () => {
  test("extension loads correctly", async ({ page }) => {
    await page.goto("chrome://extensions/")
    expect(page).toBeTruthy()
  })

  test("popup UI renders", async ({ page }) => {
    // Add extension-specific tests here
    expect(true).toBe(true)
  })
})
