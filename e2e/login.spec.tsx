import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.describe.serial("Users can login", () => {
  const username = faker.internet.userName();
  const password = "password";

  test("Register test user", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(page.getByText("Account created successfully")).toBeVisible();
  });

  test("Login with correct credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("You have successfully logged in")
    ).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Login with incorrect credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill("wrong");
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });
});
