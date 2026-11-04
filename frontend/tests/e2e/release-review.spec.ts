import { expect, test } from '@playwright/test';

test('review carousel advances inside its rail without moving the page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const feedback = page.locator('#feedback');
  const rail = feedback.locator('.review-rail');
  await expect(rail).toBeVisible();
  await feedback.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const pageY = await page.evaluate(() => window.scrollY);
  const initialRailX = await rail.evaluate((element) => element.scrollLeft);
  await expect(feedback.getByRole('button', { name: /pause automatic|resume automatic/i })).toHaveCount(0);
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft), { timeout: 8_000 }).toBeGreaterThan(initialRailX);
  expect(await page.evaluate(() => window.scrollY)).toBe(pageY);
});

test('inquiry persists through the API before opening a WhatsApp draft', async ({ page }) => {
  await page.route('**/api/public/settings', (route) => route.fulfill({ json: { ok: true, item: { whatsappNumber: '919876543210' } } }));
  await page.route('**/api/inquiries', (route) => route.fulfill({ status: 201, json: { ok: true, storage: 'mongodb', message: 'Enquiry saved.', id: 'e2e-check' } }));
  await page.goto('/');
  const form = page.locator('#book form');
  await form.locator('input[name="from"]').fill('Nashik');
  await form.locator('input[name="to"]').fill('Pune');
  await form.locator('input[name="date"]').fill('2027-01-15');
  await form.locator('input[name="time"]').fill('09:30');
  await form.locator('input[name="name"]').fill('Release Check');
  await form.locator('input[name="phone"]').fill('9876543210');
  const popupPromise = page.waitForEvent('popup');
  await form.getByRole('button', { name: /send enquiry/i }).click();
  const popup = await popupPromise;
  await expect(form.getByRole('status')).toContainText('Your enquiry was saved');
  await expect.poll(() => popup.url(), { timeout: 8_000 }).toContain('wa.me/919876543210');
  await expect.poll(() => popup.url(), { timeout: 8_000 }).toContain(encodeURIComponent('Release Check'));
});

test('Maharashtra page, human sitemap, and Trimbakeshwar image page resolve', async ({ page }) => {
  await page.goto('/maharashtra');
  await expect(page.getByRole('heading', { name: /Routes across Maharashtra/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Nashik/i }).first()).toHaveAttribute('href', '/cities/nashik');

  await page.goto('/sitemap');
  await expect(page.getByRole('heading', { name: 'Website sitemap' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Nashik Airport.*ISK/ })).toHaveAttribute('href', /\/airports\//);

  await page.goto('/cities/nashik/trimbakeshwar');
  await expect(page.getByRole('heading', { name: /Nashik to Trimbakeshwar cab enquiries/i })).toBeVisible();
  await expect(page.getByAltText(/Trimbakeshwar Temple at the foot/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What to explore around Trimbak' })).toBeVisible();
});

test('home has no horizontal overflow at narrow and fold-sized widths', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 360, 390, 430, 720, 1024, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});
