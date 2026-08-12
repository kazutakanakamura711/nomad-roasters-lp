import { expect, test } from '@playwright/test'

test('renders at each target viewport without horizontal overflow', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: /Coffee for\s*the journey/i }),
  ).toBeVisible()
  const hasNoHorizontalOverflow = await page
    .locator('body')
    .evaluate((body) => body.scrollWidth <= window.innerWidth)
  expect(hasNoHorizontalOverflow).toBe(true)
})

test('navigates to the coffee section from the hero', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('link', { name: /shop coffee/i })
    .first()
    .click()
  await expect(page.locator('#coffee')).toBeInViewport()
})
