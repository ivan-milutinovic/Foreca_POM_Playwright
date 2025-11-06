import { test, expect } from "@fixtures/base";

test.describe('REGRESSION TESTS: Functional searches', () => {

    test('S3.01: Search with autocomplete and URL validation', async ({ page, homePage, cityPage }) => {

        const PARTIAL_CITY_NAME = 'Novi S';
        const FULL_CITY_NAME = 'Novi Sad';
        const EXPECTED_URL_PART = 'Novi-Sad';

        await test.step('1. Search (partial entry) and autocomplete assertion', async () => {
            await homePage.performSearch(PARTIAL_CITY_NAME);

            const firstResultText = await cityPage.firstSearchResultCityName.textContent();
            
            expect(firstResultText).toContain(FULL_CITY_NAME);
        });

        await test.step('2. Click on the result and confirm the navigation', async () => {
            await cityPage.clickFirstSearchResult();

            const currentUrl = await cityPage.getCurrentUrl();

            expect(currentUrl.toLowerCase()).toContain(EXPECTED_URL_PART.toLowerCase())
        });

    });

    test('S3.02: Search for a city with extensive features (e.g. Čačak)', async ({ page, homePage, cityPage }) => {

            const CITY_WITH_SPECIAL_CHARS = 'Čačak';
            const EXPECTED_URL_PART = 'Čačak';

            await test.step('1. Performing a search', async () => {
                await homePage.performSearch(CITY_WITH_SPECIAL_CHARS);

                await cityPage.clickFirstSearchResult();
            });

            await test.step('2. Assertion of special characters in URL', async () => {
                const currentUrl = await cityPage.getCurrentUrl();
                const decodedUrl = decodeURI(currentUrl);

                expect(decodedUrl.toLowerCase()).toContain(EXPECTED_URL_PART.toLowerCase());
                await expect(cityPage.currentCityTemperatureC).toBeVisible();
            });            

    });

    test('S3.03: Handling check with multiple results', async ({ homePage, cityPage }) => {

        const AMBIGUOUS_SEARCH_TERM = 'London';

        await test.step('1. Search terms with more results', async () => {
            await homePage.performSearch(AMBIGUOUS_SEARCH_TERM);
        });

        await test.step('2. Assertion to show more results', async () => {
            const numberOrResults = await cityPage.searchResult.count();
            const firstResultText = await cityPage.firstSearchResultCityName.textContent();

            expect(numberOrResults).toBeGreaterThanOrEqual(1);
            expect(firstResultText).toContain(AMBIGUOUS_SEARCH_TERM);
        });

    });

});