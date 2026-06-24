import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const routes = [
    '/',
    '/team',
    '/team/omar-mohamed',
    '/team/mohamed-rayan',
    '/services',
    '/ai-workforce',
    '/integrations',
    '/work',
    '/contact'
  ];

  for (const route of routes) {
    const url = `https://www.aihandle.cloud${route}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000); // Wait for rendering
    
    const content = await page.content();
    if (content.includes('Something went wrong. Please refresh the page.')) {
      console.log(`ERROR BOUNDARY TRIGGERED on ${route}!`);
      
      const errorTextLocator = page.locator('.text-red-500');
      if (await errorTextLocator.count() > 0) {
          const errorText = await errorTextLocator.textContent();
          console.log(`ERROR MESSAGE on ${route}:`, errorText);
      }
    } else {
      console.log(`Route ${route} loaded fine.`);
    }
    
    // Take a screenshot
    const filename = route === '/' ? 'home' : route.replace(/\//g, '_').substring(1);
    await page.screenshot({ path: `tests/screenshots/${filename}.png`, fullPage: true });
  }

  await browser.close();
})();
