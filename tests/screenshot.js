import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  
  // Scroll down to trigger any lazy loaded components
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000); // Wait for lazy load
  
  await page.screenshot({ path: 'preview-screenshot.png', fullPage: true });
  console.log('Screenshot saved to preview-screenshot.png');

  const content = await page.content();
  if (content.includes('Something went wrong. Please refresh the page.')) {
    console.log('ERROR BOUNDARY TRIGGERED!');
    const errorText = await page.locator('.text-red-500').textContent();
    console.log('ERROR MESSAGE:', errorText);
  }

  await browser.close();
})();
