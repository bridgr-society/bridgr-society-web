import { test as base, expect } from '@playwright/test';
/* In sandboxes without internet, Google Fonts requests hang and delay "load".
   E2E_BLOCK_FONTS=1 aborts them; the site falls back to system fonts. */
export const test = base.extend<{ blockFonts: void }>({
  blockFonts: [async ({ context }, use) => {
    if (process.env.E2E_BLOCK_FONTS === '1') await context.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await use();
  }, { auto: true }]
});
export { expect };
