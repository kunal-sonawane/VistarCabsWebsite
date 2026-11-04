import { expect, test } from '@playwright/test';

test('homepage stays within common desktop, tablet and phone viewports and exposes SEO metadata', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390, 360, 344]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /The road ahead/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Send Enquiry/ })).toBeVisible();
    const metrics = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(metrics.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(metrics.viewport + 1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Nashik/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\/.+\/$/);
  }
});

test('the four services reveal only their relevant conditional inputs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Outstation' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Round Trip' }).click();
  await page.getByText('Optional trip details').click();
  await expect(page.getByLabel('Return date')).toBeVisible();
  await expect(page.getByLabel('Return time')).toBeVisible();
  await page.getByRole('button', { name: 'One Way' }).click();
  await expect(page.getByLabel('Return date')).toHaveCount(0);
  await page.getByRole('button', { name: 'Hourly' }).click();
  await expect(page.getByLabel('Hourly package')).toBeVisible();
  await page.getByRole('button', { name: 'Airport' }).click();
  await expect(page.getByLabel(/Flight number/)).toBeVisible();
  await expect(page.getByLabel(/Terminal/)).toBeVisible();
  await page.getByRole('button', { name: 'Corporate' }).click();
  await expect(page.getByLabel('Hourly package')).toHaveCount(0);
  await expect(page.getByLabel(/Flight number/)).toHaveCount(0);
});

test('Maharashtra autocomplete suggests Dhule and airport choices', async ({ page }) => {
  await page.goto('/');
  const from = page.locator('input[name="from"]');
  await from.fill('Dhu');
  await expect(page.getByRole('option', { name: /Dhule/i }).first()).toBeVisible();
  await from.fill('Pune Airport');
  await expect(page.getByRole('option', { name: /Pune Airport \(PNQ\)/i }).first()).toBeVisible();
});

test('homepage sections follow the agreed order and show supplied customer reviews', async ({ page }) => {
  await page.goto('/');
  const sections = ['#kumbh-home','#services','#corporate','#cities','#airports','#destinations','#feedback','#routes','#faqs'];
  const positions = await Promise.all(sections.map(selector => page.locator(selector).evaluate(el => el.getBoundingClientRect().top + window.scrollY)));
  expect(positions).toEqual([...positions].sort((a,b)=>a-b));
  const feedback = page.locator('#feedback');
  await expect(feedback.getByRole('heading', { name: /Our Valuable Customer Feedback/i })).toBeVisible();
  await expect(feedback.getByText(/supplied customer review sheet/i)).toBeVisible();
  await expect(feedback.locator('[data-review-card]')).toHaveCount(14);
});

test('route metadata is route-specific and the admin screen is excluded from indexing', async ({ page }) => {
  await page.goto('/nashik-to-pune-cab');
  await expect(page).toHaveTitle(/Nashik to Pune Cab Enquiry/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Nashik.*Pune/);
  const routeTitle=await page.title();
  await page.goto('/nashik-to-mumbai-cab');
  expect(await page.title()).not.toBe(routeTitle);
  await page.goto('/admin');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex.*nofollow/);
  await page.goto('/sitemap.xml');
  await expect(page.locator('body')).not.toContainText('/admin');
});

test('a valid enquiry saves customer and trip details, then opens WhatsApp draft', async ({ page }) => {
  let submitted:Record<string,unknown>|null=null;
  await page.route('**/api/inquiries', async route => {
    submitted=route.request().postDataJSON() as Record<string,unknown>;
    await route.fulfill({status:201,contentType:'application/json',body:JSON.stringify({ok:true,storage:'mongodb',id:'browser-test-only'})});
  });
  await page.goto('/');
  await page.locator('input[name="name"]').fill('Test Passenger');
  await page.locator('input[name="from"]').fill('Nashik');
  await page.locator('input[name="to"]').fill('Pune');
  const date = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-CA');
  await page.locator('input[name="date"]').fill(date);
  await page.locator('input[name="time"]').fill('09:15');
  await page.locator('input[name="phone"]').fill('9000000000');
  const popupPromise=page.waitForEvent('popup');
  await page.getByRole('button', { name: /Send Enquiry/ }).click();
  const popup=await popupPromise;
  await expect(popup).toHaveURL(/^https:\/\/wa\.me\/918767613575\?/);
  await expect.poll(() => submitted).not.toBeNull();
  expect(submitted).toMatchObject({name:'Test Passenger',phone:'9000000000',serviceType:'Outstation',journeyType:'One Way',from:'Nashik',to:'Pune'});
  expect(submitted).not.toHaveProperty('email');
  await expect(page).toHaveURL(/localhost|127\.0\.0\.1/);
  await expect(page.getByRole('status')).toContainText(/enquiry was saved/i);
  await expect(page.locator('input[name="name"]')).toHaveValue('');
});
