import { test, expect } from "@fixtures/base";
import { time } from "console";

test.describe('REGRESSION TESTS: Setting up users and persistence (Local Storage)', () => {

    const TARGET_CITY = 'Belgrade';
    const TARGET_CITY_URL = `https://www.foreca.com/100792680/${TARGET_CITY}-Serbia`;
    const LOCAL_STORAGE_KEY = 'fcaSettings-v2';

    const TEMP_UNIT_PATH = 'units.temp';
    const TIME_FORMAT_PATH = 'time';

    let inittialTempCelsius: number;

    // promeni currentCityTemperatureC
    test('S5.01: Changing the temperature unit and checking persistence', async ({ page, cityPage }) => {

        await test.step('1. Navigation to the city page and assertion of the initial state (C)', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });
            await expect(cityPage.currentCityTemperatureC).toBeVisible();

            const tempTextC = await cityPage.getCurrentTemperatureTextC();
            inittialTempCelsius = parseInt(tempTextC.match(/[+-]?\d+/)?.[0] || '0');

            await expect(async () => {
                const tempUnit = await cityPage.getNestedLocalStorageValue(LOCAL_STORAGE_KEY, TEMP_UNIT_PATH);
                expect(tempUnit).toContain('C');
            }).toPass({ timeout: 5000 });
        });

        await test.step('2. Change the unit to Fahrenheit (F)', async () => {
            await cityPage.clickHamburgerMenuButton();

            await cityPage.toggleToFahrenheit();
        });

        await test.step('3. Checking for a new unit (F) on the UI and in Local Storage', async () => {
            const displayedUnit = await cityPage.currentTemperatureUnit.textContent();
            const expectedTempFahrenheit = Math.round(inittialTempCelsius * 1.8 + 32);

            const tempTextF = await cityPage.getCurrentTemperatureTextF();
            const actualTempFahrenheit = parseInt(tempTextF.match(/[+-]?\d+/)?.[0] || '0');

            expect(displayedUnit).toContain('F');
            await expect(async () => {
                const tempUnit = await cityPage.getNestedLocalStorageValue(LOCAL_STORAGE_KEY, TEMP_UNIT_PATH);
                expect(tempUnit).toContain('F');
            }).toPass({ timeout: 5000 });

            expect(actualTempFahrenheit).toBeCloseTo(expectedTempFahrenheit, 0);
        });

    });

    test('S5.02: Changing the time format (24h <-> 12h)', async ({ page, cityPage }) => {

        await test.step('1. Navigation to the city page and checking the initial status (24h)', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });
            await expect(async () => {
                const timeFormat = await cityPage.getNestedLocalStorageValue(LOCAL_STORAGE_KEY, TIME_FORMAT_PATH);
                expect(timeFormat).toContain('24h');
            }).toPass({ timeout: 5000 });
        });

        await test.step('2. Changing the time format (to 12h)', async () => {
            await cityPage.clickHamburgerMenuButton();
            await cityPage.toggleTo12h();
        });

        await test.step('3. New Format Persistence Assertion (12h)', async () => {
            await expect(async () => {
                const newTimeFormat = await cityPage.getNestedLocalStorageValue(LOCAL_STORAGE_KEY, TIME_FORMAT_PATH);

                expect(newTimeFormat).toContain('12h');
            }).toPass({ timeout: 5000 });
        });

    });

});