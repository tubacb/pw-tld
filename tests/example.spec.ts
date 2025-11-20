import { test, expect } from "@playwright/test";

test("test to sign in with randomly generated username and password", async ({ page }) => {
  await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
  await page.getByTestId("username-input").fill('test');
  await page.getByTestId("password-input").fill('testtest');
  await page.getByTestId("signIn-button").click();
  await expect(
    page.getByTestId("authorizationError-popup-close-button"),
  ).toBeVisible();
});

test("password less than8", async ({ page }) => {
  await page.goto("https://fe-delivery.tallinn-learning.ee/signin");
  await page.getByTestId("username-input").fill('tes');
      await page.getByTestId("password-input").fill('tes');
  await expect(page.getByTestId("signIn-button")).toBeDisabled();
  await expect(
    page.getByText("the field must contain at least of characters: 8Sign in"),
  ).toBeEnabled();
});
