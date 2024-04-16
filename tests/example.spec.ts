import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/contentful');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ContentFul/);
});

/** Get Data */
test('get data from contentful', async ({ page, context }) => {
  await page.goto('http://localhost:3000/contentful');

  /** click the login button */
  await page.getByTestId('contentful').click()

  /** expect the name to be populated correctly */
  await expect(page.getByTestId('loader')).toHaveText('Finished')
})