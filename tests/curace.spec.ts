    // tests/login.spec.ts
    import { test, expect } from '@playwright/test';
    import { BasePage } from '../pages/basePage';
    import { CuraceLoginPage } from '../pages/curaceLogin';
    import { DemoblazeHomePage } from '../pages/demoblazeHomePage';
    

    test("Login Functionality",async ({page}) => {
       let curaceLoginPage : CuraceLoginPage;
       curaceLoginPage = new CuraceLoginPage(page);

       

        await curaceLoginPage.goto("https://curace-frontend.vercel.app/login");
        await curaceLoginPage.login_Details("demo_oneapp@farazon.com","abc123");
        await curaceLoginPage.validate_Success_Message();

        

    });

    // beforeAll
    // afterAll
    //beforeach
    //aftereach
    //Hook	Runs When	Use Case
//beforeAll	Once before all tests	Global setup
//afterAll	Once after all tests	Global cleanup
//beforeEach	Before every test	Fresh state
//afterEach	After every test	Cleanup