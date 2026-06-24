import { chromium } from 'playwright';
import fs from 'fs';

const TARGET_URL = 'https://www.aihandle.cloud';

const viewports = [
  { width: 390, height: 844, name: 'mobile-390' },
  { width: 430, height: 932, name: 'mobile-430' },
  { width: 768, height: 1024, name: 'tablet-768' },
  { width: 1280, height: 800, name: 'desktop-1280' },
  { width: 1440, height: 900, name: 'desktop-1440' },
];

const routes = [
  '/',
  '/services',
  '/services/ai-agents',
  '/services/automations',
  '/services/ai-deployment',
  '/services/websites',
  '/services/growth',
  '/services/voice-ai',
  '/work',
  '/team',
  '/team/omar-mohamed',
  '/team/mohamed-rayan',
  '/integrations',
  '/contact',
  '/admin/login'
];

(async () => {
  console.log('Starting Playwright test on ' + TARGET_URL);
  const browser = await chromium.launch();
  
  // Track errors globally
  const consoleErrors = [];
  const networkErrors = [];

  // Create context with video recording
  const context = await browser.newContext({
    recordVideo: { dir: 'tests/videos/', size: { width: 1440, height: 900 } }
  });

  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', request => {
    networkErrors.push(request.url() + ' ' + request.failure().errorText);
  });

  // 1. Hero loop test and Video Recording
  console.log('Testing Hero Video Loop...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  
  // Wait for 30 seconds to capture video of multiple loops
  console.log('Recording video for 30 seconds to verify loops...');
  await page.waitForTimeout(30000);
  
  // 2. Loop through Viewports for Home
  console.log('Taking home page screenshots across viewports...');
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(500); // let it adjust
    await page.screenshot({ path: `tests/screenshots/home-${vp.name}.png`, fullPage: true });
  }

  // 3. Test all routes on standard desktop
  console.log('Testing all routes...');
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of routes) {
    if (route === '/') continue; // already tested
    const url = TARGET_URL + route;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000); // wait for anims
    
    // Quick error check
    const content = await page.content();
    if (content.includes('Something went wrong')) {
      consoleErrors.push(`Error Boundary hit on ${route}`);
    }
    
    const filename = route.replace(/\//g, '_').substring(1);
    await page.screenshot({ path: `tests/screenshots/${filename}.png`, fullPage: true });
  }

  await context.close();
  await browser.close();

  // Output report
  const report = {
    consoleErrors,
    networkErrors,
    routesTested: routes
  };
  
  fs.writeFileSync('tests/report.json', JSON.stringify(report, null, 2));
  console.log('Test complete. Report saved to tests/report.json');
})();
