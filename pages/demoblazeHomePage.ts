// pages/BasePage.ts
import { expect, Page } from '@playwright/test';
import { DemoblazeLoginPage } from './demoblazeLoginPage';

import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as XLSX from "xlsx";
import * as path from "path";
import { FormData } from '../formdata';





export class DemoblazeHomePage {
    readonly page!: Page;
    readonly loginPage: DemoblazeLoginPage;
    readonly logo_Click = "//a[@id='nava']";
    readonly all_Text_Context = "//div[@id='tbodyid']";
    readonly laptop_Field = "//a[text()='Laptops']";
    readonly monitor_Field = "//a[text()='Monitors']";
    //click the product 
    readonly phone_product = "//a[text()='Nokia lumia 1520']";
    readonly phone_Model = "//div//h2[text()='Nokia lumia 1520']";
    readonly click_cart = "//a[text()='Add to cart']";
    //click the laptop select
    readonly laptop_Select_Product = "//h4//a[text()='Sony vaio i5']";
    readonly laptop_model = "//div//h2[text()='Sony vaio i5']";

    //Tbale Validation
    readonly cart_first_table_Validation = "//table//tbody//tr//td[text()='Nokia lumia 1520']";
    readonly cartr_second_table_Validation = "//table//tbody//tr//td[text()='Sony vaio i5']";

    readonly total_outCome = "//h3[@id='totalp']";

    readonly cart_Button = "//a[@id='cartur']";

    //placeorder
    readonly placeOrder_Button = "//button[text()='Place Order']";
    readonly formAmount = "//label[@id='totalm']";
    //purchase button
    readonly purchase_Button = "//button[text()='Purchase']";
    //Forum Fill
    readonly forumName = "//input[@id='name']";
    readonly forumCountry = "//input[@id='country']";
    readonly forumCity = "//input[@id='city']";
    readonly forumCard = "//input[@id='card']";
    readonly forumMonth = "//input[@id='month']";
    readonly forumYear = "//input[@id='year']";



    constructor(page: Page) {
        this.page = page;
        this.loginPage = new DemoblazeLoginPage(page);
    }

    // async navigate(url: string) {
    //     await this.page.goto(url);
    // }
    async HomePage(): Promise<void> {
        //phone Text 
        const phones = this.page.locator(this.all_Text_Context);

        await phones.first().waitFor({ state: 'visible' });

        const phonesTextContext: string[] = await phones.allTextContents();

        console.log("The Text Context phone:", phonesTextContext);

        //laptop Text
        await this.page.locator(this.laptop_Field).click();
        console.log("The Text Context Laptop:", phonesTextContext);

        //montor Text
        await this.page.locator(this.monitor_Field).click();
        console.log("The Text Context Laptop:", phonesTextContext);

    }

    // Add other common methods here
    async products_Select() {
        // Phone selection
        await this.page.locator(this.phone_product).click();
        await this.page.waitForTimeout(3000);

        const phoneText = await this.page.locator(this.phone_Model).textContent();
        expect.soft(phoneText?.trim()).toBe('Nokia lumia 1520');
        console.log("The Phone Product is: ", phoneText);
        //click to add to cart
        await this.page.locator(this.click_cart).click();
        await this.alert_Handle();
        await this.Retry_Validation_Link();
    }


    // Use All Functionality
    async alert_Handle() {
        this.page.once('dialog', async dialog => {
            console.log('Alert message:', dialog.message());
            await dialog.accept(); // Click OK
        });
    }

    //laptop
    // async laptop_Select() {
    //     await this.page.waitForTimeout(3000);
    //     await this.page.locator(this.laptop_Field).click();
    //     const laptop_Select = await this.page.locator(this.laptop_model).textContent();
    //     expect.soft(laptop_Select?.trim()).toBe('Sony vaio i5');
    //     console.log("The Laptop Product",laptop_Select);
    //     //click the cart
    //     await this.page.locator(this.click_cart).click();
    //     await this.alert_Handle();

    //     await this.Retry_Validation_Link();
    // }

    async selectLaptop() {
        // Click Laptop category
        // await this.page.locator(this.laptop_Field).click();

        await this.page.locator("//a[text()='Sony vaio i5']").click();

        // Wait for product to appear
        const laptop = this.page.locator(this.laptop_model);

        // Auto-wait + assertion (BEST PRACTICE)
        await expect(laptop).toBeVisible({ timeout: 30000 });
        await expect(laptop).toHaveText('Sony vaio i5');

        console.log('Laptop Product:', await laptop.textContent());

        // Click product
        await laptop.click();
        await this.page.locator(this.click_cart).click();
        //await this.alert_Handle();
        await this.Retry_Validation_Link();
    }

    async Retry_Validation_Link() {
        await this.page.locator(this.logo_Click).click();
        expect.soft(this.page).toHaveURL("https://www.demoblaze.com/index.html");
    }

    //Cart Validation 
    async table_Cart_Validation() {
        await this.page.locator(this.cart_Button).click();
        const first_Table = await this.page.locator(this.cart_first_table_Validation).innerText();
    
        expect.soft(first_Table).toBe('Nokia lumia 1520');
        console.log("The product 1 Table Actual is:", first_Table);

        const second_Table = await this.page.locator(this.cartr_second_table_Validation).textContent();
        expect.soft(second_Table).toBe('Sony vaio i5');
        console.log("The Second Product:", second_Table);
    }

    async Total_Outcome() {
        const total_Output = await this.page.locator(this.total_outCome).textContent();
        console.log("The total OutPut is:", total_Output);
        await this.page.locator(this.placeOrder_Button).click();
        const form_Amount = await this.page.locator(this.formAmount).textContent();
        console.log("The Forum Amount is", form_Amount)

    }

    //reading excel
    //file---> workbook -- sheets -- rows&columns
    // async Form_Excel_Fill(){
    //     const excelpath = "testdata\formdatas.csv";
    //     const workbook = XLSX.readFile(excelpath);
    //     const sheetNames = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[sheetNames];


    //     //convert sheet into json

    //     const sheet_To_Data : any=XLSX.utils.sheet_to_json(worksheet);
    //     console.log("The Sheet Datas are:",sheet_To_Data);

    //     for(const{name,country,city,card,month,year} of sheet_To_Data ){
    //         await this.page.locator(this.forumName).fill(name);
    //         await this.page.locator(this.forumCountry).fill(country);
    //         await this.page.locator(this.forumCity).fill(city);
    //         await this.page.locator(this.forumCard).fill(card);
    //         await this.page.locator(this.forumMonth).fill(month);
    //         await this.page.locator(this.forumYear).fill(year);

    //         //click the submit buttton
    //         await this.page.locator(this.purchase_Button).click();

    //     }

    // }
    async Form_Excel_Fill() {
        // 1️⃣ Excel / CSV path
        const excelPath = path.join(__dirname, "../testdata/formdatas.csv");

        // 2️⃣ Read workbook
        const workbook = XLSX.readFile(excelPath);

        // 3️⃣ Get first sheet name safely
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
            throw new Error("No sheets found in Excel/CSV file");
        }

        // 4️⃣ Get worksheet safely
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Worksheet "${sheetName}" not found in file`);
        }

        // 5️⃣ Convert sheet to JSON
        const sheetToData = XLSX.utils.sheet_to_json<FormData>(worksheet, {
            defval: "" // prevents undefined cell values
        });

        console.log("The Sheet Datas are:", sheetToData);

        // 6️⃣ Loop through each row and fill Playwright form
        for (const data of sheetToData) {
            await this.page.locator(this.forumName).fill(String(data.name));
            await this.page.locator(this.forumCountry).fill(String(data.country));
            await this.page.locator(this.forumCity).fill(String(data.city));
            await this.page.locator(this.forumCard).fill(String(data.card));
            await this.page.locator(this.forumMonth).fill(String(data.month));
            await this.page.locator(this.forumYear).fill(String(data.year));

            // Click submit button
            await this.page.locator(this.purchase_Button).click();
            console.log('Success To Login');
        }

       
    }
    async log() {
        for( let i: number = 1; i<5;i++){
            console.log(i);
        }
    }




}