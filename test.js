class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async login() {
    await this.page.click('a:has-text("Log in")');

    await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');
    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Universal0');
    await this.page.press('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Tab');

    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', 'Strike__24');
    await this.page.press('text=Log in × Username: Password: Close Log in >> input[type="password"]', 'Enter');

    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
      this.page.click('button:has-text("Log in")')
    ]);
  
    await this.page.click('text=Welcome Universal0');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/#');
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.click('text=Nokia lumia 1520');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2');
  }

  async addToCart() {
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await this.page.click('text=Add to cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2#');

    await this.page.click('text=Cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');
  }

  async deleteFromCart() {
    await this.page.click('text=Nokia lumia 1520820Delete >> img');

    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
      this.page.click('text=Delete')
    ]);
  
    await this.page.click('div:has-text("Products Pic Title Price x Total Place Order")');
  }
}


const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.login();

  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.addToCart();
  await cartPage.deleteFromCart();
});