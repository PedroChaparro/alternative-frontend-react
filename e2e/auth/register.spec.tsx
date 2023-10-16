import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("The fields are validated", async ({ page }) => {
  await page.goto("/register");

  // Short username and password
  await page.getByLabel("Username").fill("a");
  await page.getByLabel("Password", { exact: true }).fill("a");
  await page.getByLabel("Confirm Password", { exact: true }).fill("a");
  await page.getByRole("button", { name: "Submit", exact: true }).click();

  await expect(
    page.getByText("Username must be at least 3 characters long")
  ).toBeVisible();
  await expect(
    page.getByText("Password must be at least 8 characters long")
  ).toBeVisible();

  // Not matching passwords
  await page.getByLabel("Username").fill("username");
  await page.getByLabel("Password", { exact: true }).fill("password");
  await page.getByLabel("Confirm Password", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Submit", exact: true }).click();

  await expect(page.getByText("Passwords do not match")).toBeVisible();
});

test.describe.serial("The user can register", () => {
  const username = faker.internet.userName();
  const password = "password";

  test("Register with new credentials", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Cannot register with existing credentials", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("username already registered")).toBeVisible();
  });
});
