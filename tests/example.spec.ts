import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/ar";

test("has title", async ({ page }) => {
  await page.goto(process.env.APP_URL); //'https://fe-delivery.tallinn-learning.ee/signin'
  await page.getByTestId("username-input").fill(faker.internet.username());
  await page.getByTestId("password-input").fill(faker.internet.password());
  await page.getByTestId("signIn-button").click();
  await expect(
    page.getByTestId("authorizationError-popup-close-button"),
  ).toBeVisible();
});

test("password less than8", async ({ page }) => {
  await page.goto("https://fe-delivery.tallinn-learning.ee/signin");
  await page.getByTestId("username-input").fill("test");
  await page.getByTestId("password-input").fill("test");
  await expect(page.getByTestId("signIn-button")).toBeDisabled();
  await expect(
    page.getByText("the field must contain at least of characters: 8Sign in"),
  ).toBeEnabled();
});
