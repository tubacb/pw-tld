import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/ar";

test("test to sign in with randomly generated username and password", async ({ page }) => {
    await page.goto(process.env.APP_URL); //'https://fe-delivery.tallinn-learning.ee/signin'
    await page.getByTestId("username-input").fill(faker.internet.username());
    await page.getByTestId("password-input").fill(faker.internet.password());
    await page.getByTestId("signIn-button").click();
    await expect(
        page.getByTestId("authorizationError-popup-close-button"),
    ).toBeVisible();
});

test("to test to show warning and disabled sign in button when password and username less than 8 characters", async ({ page }) => {
    await page.goto(process.env.APP_URL);
    await page.getByTestId("username-input").fill(faker.internet.username().slice(0, 3));
    await page.getByTestId("password-input").fill(faker.internet.password({ length: 3 }));
    await expect(page.getByTestId("signIn-button")).toBeDisabled();
    await expect(
        page.getByText("the field must contain at least of characters: 8Sign in"),
    ).toBeVisible();
});