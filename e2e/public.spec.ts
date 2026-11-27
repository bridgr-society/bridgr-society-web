import { type Page } from '@playwright/test';
import { test, expect } from './fixtures';
const MODE = process.env.E2E_MODE || 'production';
const fits = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);

test('home explains the product without sign-in', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build your skills.');
  await expect(page.getByRole('link', { name: /Explore programs/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Help me choose' }).first()).toBeVisible();
  await fits(page);
});

test('finder → filtered programs → detail (works without JavaScript too)', async ({ page }) => {
  await page.goto('/');
  await page.locator('.finder select[name=destination]').selectOption('taiwan');
  await page.locator('.finder select[name=type]').selectOption('internship');
  await page.locator('.finder button[type=submit]').click();
  await expect(page).toHaveURL(/\/programs\?destination=taiwan&field=&type=internship|\/programs\?destination=taiwan.*type=internship/);
  await expect(page.locator('.pcard')).toHaveCount(3);
  await page.locator('.pcard h3 a').first().click();
  await expect(page.locator('#lang')).toContainText('Mandarin');
  await expect(page.getByText('To be confirmed').first()).toBeVisible();
  await fits(page);
});

test('direct URLs, filters and no-match state', async ({ page }) => {
  await page.goto('/programs?field=finance&destination=china');
  await expect(page.getByText('No programs match all of these filters')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ask an advisor' })).toHaveAttribute('href', /kind=match/);
  await page.goto('/programs?destination=mars');
  await expect(page.locator('.pcard')).toHaveCount(9);
  for (const u of ['/destinations/singapore', '/career-fields/design', '/program-types', '/how-it-works', '/mandarin', '/apply', '/privacy', '/terms']){
    const r = await page.goto(u); expect(r?.status()).toBe(200); await fits(page);
  }
  expect((await page.goto('/programs/does-not-exist'))?.status()).toBe(404);
});

test('guided matching gives reasons or an honest no-match', async ({ page }) => {
  await page.goto('/match/results?stage=Recent+graduate+%28within+2+years%29&dest=singapore&fields=finance&type=internship&start=Summer+2027&duration=medium&mandarin=none&goal=Build+work+experience+abroad');
  await expect(page.getByText('In Singapore, as you chose').first()).toBeVisible();
  await page.goto('/match/results?stage=Recent+graduate+%28within+2+years%29&dest=singapore&fields=production&type=immersion&start=Summer+2027&duration=medium&mandarin=none&goal=Build+work+experience+abroad');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('No exact match yet');
});

test('Academy offer stays inactive', async ({ page }) => {
  await page.goto('/mandarin');
  await expect(page.getByText('Applicant learning offer — details coming soon')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Offer not available yet' })).toBeDisabled();
});

test.describe('production without integrations', () => {
  test.skip(MODE !== 'production');
  test('applications say they are not connected, never fake it', async ({ page }) => {
    await page.goto('/programs/taipei-marketing');
    await page.locator('.detail-side .btn-primary, .mobile-cta .btn-primary').first().click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Online applications aren’t open yet');
    for (const u of ['/applications', '/account', '/applications/APP-1-ABCD']) { await page.goto(u); await expect(page.locator('.notconn')).toBeVisible(); }
  });
  test('enquiry form is disabled and explains why', async ({ page }) => {
    await page.goto('/enquire?program=shenzhen-tech&kind=interest');
    await expect(page.getByText('This form isn’t connected yet.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
  test('no demo controls or environment banner in production', async ({ page }) => {
    expect((await page.goto('/status'))?.status()).toBe(404);
    await page.goto('/'); await expect(page.locator('.env-banner')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Sign in' })).toHaveCount(0);
  });
});
