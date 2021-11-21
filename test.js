const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://www.demoblaze.com/
  await page.goto('https://www.demoblaze.com/');

  // Click a:has-text("Log in")
  await page.click('a:has-text("Log in")');

  // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Universal0');

  // Press Tab
  await page.press('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Tab');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', 'Strike__24');

  // Press Enter
  await page.press('text=Log in × Username: Password: Close Log in >> input[type="password"]', 'Enter');

  // Click button:has-text("Log in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
    page.click('button:has-text("Log in")')
  ]);

  // Click text=Welcome Universal0
  await page.click('text=Welcome Universal0');
  await expect(page).toHaveURL('https://www.demoblaze.com/#');

  // Click text=Nokia lumia 1520
  await page.click('text=Nokia lumia 1520');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2');

  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Add to cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2#');

  // Click text=Cart
  await page.click('text=Cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

  // Click text=Nokia lumia 1520820Delete >> img
  await page.click('text=Nokia lumia 1520820Delete >> img');

  // Click text=Delete
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
    page.click('text=Delete')
  ]);

  // Click div:has-text("Products Pic Title Price x Total Place Order")
  await page.click('div:has-text("Products Pic Title Price x Total Place Order")');

});