import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can remove a file", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });

  test("Register test user", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Upload test file", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the upload modal
    await page.getByRole("button", { name: "Upload file" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Upload files", { exact: true })).toBeVisible();

    // Upload a file
    const filesInput = page.getByLabel("Choose files to upload", {
      exact: true
    });
    await filesInput.setInputFiles([
      path.join(__dirname, "data/in/yellow.jpg"),
      path.join(__dirname, "data/in/blue.jpg")
    ]);

    // Submit the form
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert files are shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
    await expect(page.getByText("blue.jpg")).toBeVisible();
  });

  test("Successfully deleted", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the file dropdown
    const fileCard = page.getByRole("button", { name: "yellow.jpg card" });
    await expect(fileCard).toBeVisible();
    await fileCard.getByLabel("More options for yellow.jpg").click();

    // Open the modal
    const removeButton = page.getByRole("menuitem", {
      name: "Remove file",
      exact: true
    });

    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await page.getByRole("button", { name: "Remove", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert the file is not visible
    await expect(
      page.getByRole("button", { name: "yellow.jpg card" })
    ).not.toBeVisible();

    // Assert an alert is shown
    await expect(page.getByText("File successfully deleted")).toBeVisible();
  });

  test("Cancel deleted", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the file dropdown
    const fileCard = page.getByRole("button", { name: "blue.jpg card" });
    await expect(fileCard).toBeVisible();
    await fileCard.getByLabel("More options for blue.jpg").click();

    // Open the modal
    const removeButton = page.getByRole("menuitem", {
      name: "Remove file",
      exact: true
    });

    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await page.getByRole("button", { name: "Cancel", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
