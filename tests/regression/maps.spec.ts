import { test, expect } from "@fixtures/base";

test.describe('REGRESSION TESTS: Checking the functionality of the map', () => {


    const MAPS_URL_PART = 'weathermap/rain';

    test('S6.01: Loading Maps and checking visibility', async ({ page, homePage, mapsPage }) => {
        
        await test.step('1. Navigation on Maps', async () => {
            await homePage.clickMapsLink();

            await page.waitForURL(/.*weather.*/);
        });

        await test.step('2. URL assertion and ad closure', async () => {
            const currentUrl = await mapsPage.getCurrentUrl();

            expect(currentUrl).toContain(MAPS_URL_PART);
        });

        await test.step('3. Checking that the map container is visible', async () => {
            await expect(mapsPage.mapContainer).toBeVisible({ timeout: 10000 });
        });

    });

    test('S6.02: Zoom functionality (Zoom In/Out)', async ({ page, homePage, mapsPage }) => {

        await test.step('1. Preparation (Map navigation)', async () => {
             await homePage.clickMapsLink();

            await page.waitForURL(/.*weather.*/);
        });

        await test.step('2. Zooming (Zoom IN)', async () => {
            await mapsPage.clickZoomIn();

            await expect(mapsPage.zoomOutButton).toBeEnabled();
        });

        await test.step('3. Zooming (Zoom OUT)', async () => {
            await mapsPage.clickZoomOut();

            await expect(mapsPage.mapContainer).toBeVisible()
        });

    });

});