import { test, expect } from '@fixtures/base';

test.describe('REGRESSION TESTS: Forecast check (10 days)', () => {

    const TARGET_CITY = 'Belgrade';
    const TARGET_CITY_URL = `https://www.foreca.com/100792680/${TARGET_CITY}-Serbia`;

   test('S7.01: Navigation and integrity of the 10-day forecast', async ({ page, cityPage }) => {

        await test.step('1. Navigation to the city page', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });

            await expect(cityPage.currentCityTemperatureC).toBeVisible();
        });

        await test.step('2. Navigation to 10-day forecast', async () => {
            await cityPage.navigateToTenDayForecast();

            await expect(page).toHaveURL(/.*10-day-forecast*./i);
        });

        await test.step('3. Checking that at least 10 rows have been loaded', async () => {
            await expect(cityPage.tenDayRows.first()).toBeVisible();

            const rowCount = await cityPage.tenDayRows.count();

            expect(rowCount).toBeGreaterThanOrEqual(10);
        });

        await test.step('4. Checking the correctness of the data on the first day', async () => {
            const firstRow = cityPage.tenDayRows.first();

            const dateText = await firstRow.locator('.date .time_12h').textContent();
            expect(dateText?.trim()).toMatch(/^\d{1,2}\s+\w+$/i);

            const tempText = await firstRow.locator('.temp_c.max').textContent();
            const trimmedTempMax = tempText?.trim();
            expect(trimmedTempMax).toMatch(/^-?\d+°$/i);
        });

   });   

});