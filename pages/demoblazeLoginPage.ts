    // pages/BasePage.ts
    import { Browser, expect, Page } from '@playwright/test';

    export class DemoblazeLoginPage  {
        readonly page: Page;
        readonly logoText = "//img[@alt='Curace Logo']";
        
        readonly loginHeader   = "//a[text()='Log in']";
        readonly username_Field = "//input[@id='loginusername']";
        readonly password_Field = "//input[@id='loginpassword']";
        readonly login_Button = "//button[text()='Log in']";
        readonly validate_Title = "//a[@id='nava']";
        browser?: Browser;

        constructor(page: Page) {
            this.page = page;
        }

        
        async goto(url : string) {
          // Use this.page instead of page
           await this.page.goto(url);
           await this.page.setViewportSize({ width: 1366, height: 768 });

        }

        // Add other common methods here
        async login_Details(username: string, password: string) {
            try{
                await this.page.locator(this.loginHeader).click();
                await this.page.fill(this.username_Field, username);
                await this.page.fill(this.password_Field, password);
                await this.page.click(this.login_Button);
                console.log("✅ Login details entered successfully");
            } catch (err) {
              const error = err instanceof Error ? err.message : String(err);
              console.error("Exception during login or validation:", err);
              return { success: false, error: error };
              }
        }

        async validate_Title_Fun() {
            try {
                await this.page.waitForTimeout(5000);
                const expectedTitle = "PRODUCT STORE";
                const title = await this.page.locator(this.validate_Title).textContent();
                if(title?.trim() === expectedTitle) {
                    console.log("✅ Title validation successful");
                }
               console.log(title, 'THE TITLE TEXT',expectedTitle);
            } catch(err) {
                console.log("Exception during title validation:" ,err);
                const error = err instanceof Error ? err.message : String(err);
                return { success: false, error: error };
            }

        }

        async product_Buy_ValidationTable() {
            
        }


    }

    
