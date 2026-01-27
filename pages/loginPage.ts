    // pages/BasePage.ts
    import { Page } from '@playwright/test';

    export class LoginPage {
        readonly page: Page;

        constructor(page: Page) {
            this.page = page;
        }

        async navigate(url: string) {
            await this.page.goto(url);
        }

        // Add other common methods here
        
    }