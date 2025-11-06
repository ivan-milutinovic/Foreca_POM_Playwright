import { Page, Locator } from "@playwright/test";

import { BasePage } from '@pages/BasePage';

export class HomePage extends BasePage {

    readonly logo: Locator;
    readonly searchField: Locator;
    readonly searchResultList: Locator;
    // readonly autoCompleteResults: Locator;
    readonly navigationLinkMaps: Locator;
    readonly navigationLinkToday: Locator;
    readonly navigationLinkHourly: Locator;
    readonly noResultsMessage: Locator;
    readonly advertCloseButton: Locator;

    constructor(page: Page) {
        super(page);

        this.logo = page.locator('a.logoLink');
        this.searchField = page.locator('#searchField');
        this.searchResultList = page.locator('#search ul li');
        // this.autoCompleteResults = page.locator('div.ui-menu-item');
        this.navigationLinkMaps = page.locator('.quickLinks ul li a[href="/weathermap/rain"]');
        this.navigationLinkToday = page.locator('nav .quickLinks a:has-text("Today")');
        this.navigationLinkHourly = page.locator('nav .quickLinks a:has-text("Hourly")');
        this.noResultsMessage = page.locator('text=Nema rezultata');
        // this.advertCloseButton = page.locator('iframe[id*="google_ads_iframe"]').contentFrame().getByRole('button', { name: 'Close ad' });
        // this.advertCloseButton = page.locator('#dismiss-button');
        this.advertCloseButton = page.getByRole('button', { name: 'Close ad' });
    }

    //actions
    async goto(): Promise<void> {
        await this.page.goto('https://www.foreca.com/', { waitUntil: 'load'});
    }

    async performSearch(cityName: string): Promise<void> {
        await this.searchField.type(cityName, { delay: 100 });
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState('load');

    }

    async clickMapsLink(): Promise<void> {
        await this.clickElement(this.navigationLinkMaps);
        await this.page.waitForTimeout(500);
        await this.page.waitForURL(/.*weathermap*./, { waitUntil: 'load'});
    }

    async clickTodayLink(): Promise<void> {
        await this.clickElement(this.navigationLinkToday);
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState('load');
    }

    async clickHourlyLink(): Promise<void> {
        await this.clickElement(this.navigationLinkHourly);
        await this.page.waitForTimeout(500);
        await this.page.waitForURL(/.*hourly*./, { waitUntil: 'load' });
    }

    async clickLogo(): Promise<void> {
        await this.clickElement(this.logo);
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState('load');
    }

    //getters
    async isNoResultsMessageVisible(): Promise<boolean> {
        return this.noResultsMessage.isVisible();
    }

}