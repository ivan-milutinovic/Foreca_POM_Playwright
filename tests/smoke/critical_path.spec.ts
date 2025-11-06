import { test, expect } from "@fixtures/base";

import { readExcelData, CityData } from "@utils/excelReader";

const testCitiesData: CityData[] = readExcelData('testCities.xlsx', 'Sheet1');
if (testCitiesData.length === 0) {
    throw new Error('Test data not found in Excel file');
}

test.describe('SMOKE TESTS: Critical Path Check (Quick Check)', () => {

    test.describe('DATA-DRIVEN: city ​​search from an excel file', () => {

        for (const cityData of testCitiesData) {

            test(`S2.01: Successful city search: ${cityData.city_name}`, async ({ homePage, cityPage }) => {
                
                const CITY_NAME = cityData.city_name;
                const EXPECTED_TITLE = cityData.expected_title_part;
                const EXPECTED_URL_PART = cityData.expected_url_part;

                await test.step(`1. City search (${CITY_NAME}) and navigation`, async () => {
                    await homePage.performSearch(CITY_NAME); 
                    await cityPage.clickFirstSearchResult();

                    const currentUrl = await cityPage.getCurrentUrl();
                    const currentPageTitle = await cityPage.getPageTitle();
                    
                    expect(currentUrl.toLowerCase()).toContain(EXPECTED_URL_PART.toLowerCase());
                    expect(currentPageTitle).toContain(EXPECTED_TITLE);
                });

                await test.step('2. Assertion of critical UI elements (Temperature)', async() => {
                    await expect(cityPage.currentCityTemperatureC).toBeVisible();
                    
                    const temperatureText = await cityPage.getCurrentTemperatureTextC();
                    const trimmedTempText = temperatureText.trim();
                    
                    expect(trimmedTempText).toMatch(/^[+-]?\d+°$/);
                });
            });
        }

    });

    test('S2.02: Navigation to the home page by clicking on the logo', async ({ page, homePage, cityPage }) => {

        const CITY_NAME = 'Belgrade';
        const INITIAL_URL = await homePage.getCurrentUrl();
        const EXPECTED_URL = `https://www.foreca.com/100792680/${CITY_NAME}-Serbia`;

        await test.step('1. Navigation to the city page (preparation for the return test)', async () => {
            await page.goto(`https://www.foreca.com/100792680/${CITY_NAME}-Serbia`, { waitUntil: 'load' });
            await expect(page).not.toHaveURL(INITIAL_URL);
        });

        await test.step('2. Click on the logo and return assertion', async () => {
            await homePage.clickLogo();

            await expect(page).toHaveURL(EXPECTED_URL, { timeout: 5000 });
        });

    });

    test('S2.03: Display message for failed search', async ({ homePage, cityPage }) => {

        const NON_EXISTENT_CITY = 'ttyyruut';
        const EXPECTED_ERROR_MESSAGE = 'No locations found';

        await test.step('1. Performing an unsuccessful search', async () => {
            await homePage.performSearch(NON_EXISTENT_CITY);
        });

        await test.step('2. Error message validation', async () => {
            const CURRENT_ERROR_MESSAGE = await cityPage.firstSearchResult.textContent();

            expect(CURRENT_ERROR_MESSAGE).toMatch(EXPECTED_ERROR_MESSAGE);
        });

    });

    test('S2.04: Quick navigation to Maps', async ({ page, homePage, cityPage, mapsPage }) => {

        const EXPECTED_URL_TO_CONTAIN = 'weathermap/rain';

        await test.step('1. Click on the Maps link (weathermap-rain)', async () => {
            await homePage.clickMapsLink();
        });

        await test.step('2. URL assertion', async () => {
            const CURRENT_URL = await mapsPage.getCurrentUrl();
            expect(CURRENT_URL).toContain(EXPECTED_URL_TO_CONTAIN);
        });

    });

    test('S2.05: Checking that the default unit in Local Storage is Celsius', async ({ page, homePage, cityPage }) => {

        const TARGET_CITY = 'Belgrade';
        const TARGET_CITY_URL = `https://www.foreca.com/100792680/${TARGET_CITY}-Serbia`;
        const LOCAL_STORAGE_KEY = 'fcaSettings-v2';
        const NESTED_PATH = 'units.temp';

        await test.step('1. Navigation and waiting for a critical UI element', async () => {
            await page.goto(TARGET_CITY_URL, { waitUntil: 'load' });               

            await expect(cityPage.currentCityTemperatureC).toBeVisible({ timeout: 15000 }); 
        });

        await test.step('2. Checking the default drive (C) in Local Storage', async () => {            
            await expect(async () => {
                const tempUnit = await cityPage.getNestedLocalStorageValue(LOCAL_STORAGE_KEY, NESTED_PATH);
                expect(tempUnit).not.toBeNull(); 
                expect(tempUnit).toBe('C');                
            }).toPass({ timeout: 5000 });
        });

    });

});