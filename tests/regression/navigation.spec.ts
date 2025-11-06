import { test, expect } from '@fixtures/base';

test.describe('REGRESSION TESTS: Different navigation scenarios', () => {

    const TARGET_CITY = 'Belgrade';
    const CITY_SLUG = `${TARGET_CITY}-Serbia`;
    const TARGET_CITY_URL = `https://www.foreca.com/100792680/${CITY_SLUG}`;

    test('S4.01: Return from the Maps page to the city page (link: Today)', async ({ page, homePage, cityPage, mapsPage }) => {

        await test.step('1. Navigation to the city page (preparation)', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });

            await expect(cityPage.currentCityTemperatureC).toBeVisible();
        });

        await test.step('2. Map navigation', async () => {
            await homePage.clickMapsLink();            

            const currentUrl = await mapsPage.getCurrentUrl();

            expect(currentUrl).toContain('weathermap');
        });

        await test.step('3. Return to the city page by clicking on the link: Today', async () => {
            await homePage.clickTodayLink();

            await expect(cityPage.currentCityTemperatureC).toBeVisible();
        });

    });

    test('S4.02: Direct navigation using direct url', async ({ page, cityPage }) => {

        await test.step('1. Navigation using url', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });
        });

        await test.step('2. Assertion that the site has loaded TARGET_CITY_URL', async () => {
            const currentUrl = await cityPage.getCurrentUrl();

            expect(currentUrl.toLowerCase()).toBe(TARGET_CITY_URL.toLowerCase());

            await expect(cityPage.currentCityTemperatureC).toBeVisible();
        });
        
    });

    test('S4.03: Navigation within the detailed forecast view', async ({ page, homePage, cityPage }) => {

        const EXPECTED_SECTION_URL = 'hourly';

        await test.step('1. Navigation to the city page (preparation)' , async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });
        });

        await test.step('2. Click on the link for the daily forecast', async () => {
            await homePage.clickHourlyLink();
        });
        
        await test.step('3. Assertion of detailed forecast URL', async () => {
            const currentUrl = await cityPage.getCurrentUrl();
            const currentPageTitle = await cityPage.getPageTitle();

            expect(currentUrl.toLowerCase()).toContain(EXPECTED_SECTION_URL);
            expect(currentPageTitle.toLowerCase()).toContain(EXPECTED_SECTION_URL);
        });

    });

});