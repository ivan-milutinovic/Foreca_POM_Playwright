import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //actions
    async clickElement(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: timeout });
        await locator.click();
    }

    async fillElement(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    //getters
    async getCurrentUrl(): Promise<string> {
        await this.page.waitForLoadState('load');
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        await this.page.waitForLoadState('load');
        return this.page.title();
    }

    async getNestedLocalStorageValue(key: string, nestedKey: string): Promise<string | null> {      
        const value = await this.page.evaluate(({ k, nk }) => {
            const item = window.localStorage.getItem(k);
            if (!item) return null;

            try {
                const jsonObject = JSON.parse(item);
                const path = nk.split('.');
                let result = jsonObject;

                for (const segment of path) {
                    if (result && typeof result === 'object' && segment in result) {
                        result = result[segment];
                    } else {
                        return null; 
                    }
                }
                return String(result);
            } catch (e) {
                return null;
            }
        }, { k: key, nk: nestedKey });
        return value;
    };

}