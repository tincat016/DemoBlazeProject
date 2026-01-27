import { Page, expect,Browser } from "@playwright/test";

export class unityPage {
  readonly page: Page;
  //readonly text_Content =  ;
  readonly text_Content ="//div[@class='logged-user-name']";
  browser?: Browser;

  constructor(page: Page) {
    this.page = page;
  }

  async Text_Validate_After_Login(){
    const locator = this.page.locator(this.text_Content);
    // Best practice: auto-wait until visible and text exists
    await expect(locator).toHaveText("Jack Gomez", { timeout: 10000 });


  }


}