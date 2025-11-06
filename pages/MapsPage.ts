import { Page, Locator } from "@playwright/test";

import { BasePage } from '@pages/BasePage';

export class MapsPage extends BasePage {

    readonly mapContainer: Locator;
    readonly zoomInButton: Locator;
    readonly zoomOutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.mapContainer =  page.getByRole('region', { name: 'Map' });
        this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
        this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' })
    }

    //actions
    async clickZoomIn(): Promise<void> {
        await this.zoomInButton.click();
    }

    async clickZoomOut(): Promise<void> {
        await this.zoomOutButton.click();
    }

    //getters
    async isMapContainerVisible(): Promise<boolean> {
        return this.mapContainer.isVisible();
    }

}