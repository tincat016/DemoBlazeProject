    // pages/BasePage.ts
    import { Browser, expect, Page } from '@playwright/test';

    export class CuraceLoginPage {
        readonly page: Page;
        readonly logoText = "//img[@alt='Curace Logo']";
        readonly email_Field = "//input[@name='email']";
        readonly password_Field = "//input[@name='password']";
        readonly login_Button = "//button[@type='submit']";
        readonly success_Dialog_1 = "//div[text()='Login successful']";
        readonly success_Dialog_2 = "//div[text()='You have been successfully Logged in.']";
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
        async login_Details(email: string, password: string) {
            try{
                await this.page.fill(this.email_Field, email);
                await this.page.fill(this.password_Field, password);
                await this.page.click(this.login_Button);
                console.log("✅ Login details entered successfully");
            } catch (err) {
              const error = err instanceof Error ? err.message : String(err);
              console.error("Exception during login or validation:", err);
              return { success: false, error: error };
              }
        }

        async validate_Success_Message() {
            const dialog1 = this.page.locator(this.success_Dialog_1);
            const dialog2 = this.page.locator(this.success_Dialog_2);
            await this.page.waitForTimeout(5000);
            expect(dialog1).toHaveText("Login successful", { timeout: 30000 });
            expect(dialog2).toHaveText("You have been successfully Logged in.", { timeout: 10000 });
            console.log("✅ Login success messages validated");
            
        }
        
    }