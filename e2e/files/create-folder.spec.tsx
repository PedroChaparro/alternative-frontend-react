import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.describe.serial("Users can create a folder", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const folderName = faker.system.fileName();

  test("Register test user", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Create a folder", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the Create folder dialog
    await page
      .getByRole("button", { name: "Create folder", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByText("Create a new folder", { exact: true })
    ).toBeVisible();

    // Fill the form
    await page.getByLabel("Name").fill(folderName);
    await page.getByRole("button", { name: "Create", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert an alert is shown
    await expect(
      page.getByText("The folder has been created successfully")
    ).toBeVisible();

    // Assert the folder appears in the UI
    await expect(page.getByText(folderName)).toBeVisible();
  });

  test("Cannot create a folder with an existing name", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the Create folder dialog
    await page
      .getByRole("button", { name: "Create folder", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Fill the form
    await page.getByLabel("Name").fill(folderName);
    await page.getByRole("button", { name: "Create", exact: true }).click();

    // Assert an alert is shown
    await expect(
      page.getByText(
        "A file with the same name already exists in the given directory"
      )
    ).toBeVisible();
  });
});
