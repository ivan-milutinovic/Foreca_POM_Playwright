import { test as baseTest } from '@playwright/test';

import { HomePage } from '@pages/HomePage';
import { CityPage } from '@pages/CityPage';
import { MapsPage } from '@pages/MapsPage';

type MyFixtures = {
    homePage: HomePage;
    cityPage: CityPage;
    mapsPage: MapsPage;
};

export const test = baseTest.extend<MyFixtures>({

    context: async ({ context }, use) => {
        await context.clearCookies();

        await context.route(/google-analytics|googletagservices|googlesyndication|doubleclick/i, route => {
            //umesto slanja zahteva, Playwright odgovara sa praznim nizom
            route.fulfill({ status: 200, body: '' });
        });

        await context.addInitScript(() => {
            // window.localStorage.clear();
            window.sessionStorage.clear();
        });
        await use(context);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    },
    cityPage: async ({ page }, use) => {
        await use(new CityPage(page));
    },
    mapsPage: async ({ page }, use) => {
        await use(new MapsPage(page));
    }
});

export { expect } from '@playwright/test';