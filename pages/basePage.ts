import { Page, expect,Browser } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly text_Content = "//h4[text()='         Login Form       ']";
  readonly user ="//input[@placeholder='Enter your username']";
  readonly password ="//input[@placeholder='Enter your password']";
  readonly SignIN_Button = "//a[@id='log-in']";
  browser?: Browser;

  constructor(page: Page) {
    this.page = page;
  }

    async textContent_Validation() {
       const locator = this.page.locator(this.text_Content);

       // Best practice: auto-wait until visible and text exists
       await expect(locator).toHaveText("         Login Form       ", { timeout: 10000 });

       console.log("✅ Text validation passed");
    }

    async Enter_The_UserID_Password_Text() {
      await this.page.fill(this.user, "Kowsik");
      await this.page.fill(this.password, "Koushik@123");
      await this.page.click(this.SignIN_Button);
      console.log("✅ UserID and Password entered successfully");

    }

    async closeBrowser(): Promise<void> {
            if (this.browser) {
                 await this.browser.close();
                 console.log("🧹 Browser closed successfully");
            } else {
                console.warn("⚠️ No browser instance to close");
            }
    }

}

