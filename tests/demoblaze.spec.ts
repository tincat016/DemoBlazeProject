  // tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { DemoblazeLoginPage } from '../pages/demoblazeLoginPage';
import { DemoblazeHomePage } from '../pages/demoblazeHomePage';

test('DemoBlaze Login Page - Login Functionality', async ({ page }) => {
     const demoblazeLoginPage = new DemoblazeLoginPage(page);
     const demoBlazeHomePage = new DemoblazeHomePage(page);

           await demoblazeLoginPage.goto('https://www.demoblaze.com/');
           await demoblazeLoginPage.login_Details('harish2116', 'harish2116');
           await demoblazeLoginPage.validate_Title_Fun();

           await demoBlazeHomePage.HomePage();
           await demoBlazeHomePage.products_Select();
           await demoBlazeHomePage.selectLaptop();
           await demoBlazeHomePage.table_Cart_Validation();
           await demoBlazeHomePage.Total_Outcome();
           await demoBlazeHomePage.Form_Excel_Fill();
});
