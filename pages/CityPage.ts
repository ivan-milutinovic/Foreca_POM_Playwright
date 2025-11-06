import { Page, Locator } from "@playwright/test";

import { BasePage } from '@pages/BasePage';

export class CityPage extends BasePage {

    readonly firstSearchResult: Locator;
    readonly firstSearchResultCityName: Locator;
    readonly searchResult: Locator;
    readonly tenDayForecastTab: Locator;
    readonly tenDayRows: Locator;
    readonly currentCityTemperatureC: Locator;
    readonly currentCityTemperatureF: Locator;
    readonly currentTemperatureUnit: Locator;
    readonly unitToggleFahrenheit: Locator;
    readonly unitToggle12h: Locator;
    readonly hamburgerMenuToggle: Locator;

    constructor(page: Page) {
        super(page);

        this.firstSearchResult = page.locator('#search ul li').first();
        this.firstSearchResultCityName = page.locator('#search ul li .name p em').first();
        this.searchResult = page.locator('#search ul li');
        this.tenDayForecastTab = page.locator('.quickLinks ul li a:has-text("10 day")');
        this.tenDayRows = page.locator('.dayContainer .day-container');
        this.currentCityTemperatureC = page.locator('.row .temp .large .temp_c');
        this.currentCityTemperatureF = page.locator('.row .temp .large .temp_f');
        this.currentTemperatureUnit = page.locator('nav.drawer .container .settings .units_wrap .radio input:checked+.title');
        this.unitToggleFahrenheit = page.getByText('F°');
        this.unitToggle12h = page.getByText('12h');
        this.hamburgerMenuToggle = page.locator('#drawerToggle');
    }

    //actions
    async clickFirstSearchResult(): Promise<void> {
        await this.clickElement(this.firstSearchResult);
        await this.page.waitForLoadState('load');
    }

    async clickHamburgerMenuButton(): Promise<void> {
        await this.clickElement(this.hamburgerMenuToggle);
        await this.page.waitForLoadState('load');
    }   

    async navigateToTenDayForecast(): Promise<void> {
        await this.clickElement(this.tenDayForecastTab);
        await this.page.waitForLoadState('load');
    }
    
    async toggleToFahrenheit(): Promise<void> {
        await this.clickElement(this.unitToggleFahrenheit);
        await this.page.waitForLoadState('load');
    }

    async toggleTo12h(): Promise<void> {
        await this.clickElement(this.unitToggle12h);
        await this.page.waitForLoadState('load');
    }

    //getters
    async getCurrentTemperatureTextC(): Promise<string> {
        return this.currentCityTemperatureC.innerText();
    }

    async getCurrentTemperatureTextF(): Promise<string> {
        return this.currentCityTemperatureF.innerText();
    }

    async getTenDayRowCount(): Promise<number> {
        return this.tenDayRows.count();
    }

}