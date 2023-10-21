import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can upload files", () => {
  const username = faker.internet.userName();
  const password = "password";

  test("Register test user", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Users can upload files", async ({ page }) => {
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
      path.join(__dirname, "data/in/blue.jpg"),
      path.join(__dirname, "data/in/red.jpg")
    ]);

    // Submit the form
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert files are shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
    await expect(page.getByText("blue.jpg")).toBeVisible();
    await expect(page.getByText("red.jpg")).toBeVisible();
  });

  test("Users cannot upload files with the same name", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the upload modal
    await page.getByRole("button", { name: "Upload file" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Upload a file
    const filesInput = page.getByLabel("Choose files to upload", {
      exact: true
    });
    await filesInput.setInputFiles([
      path.join(__dirname, "data/in/yellow.jpg")
    ]);

    // Submit the form
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert an alert is shown
    await expect(
      page.getByText(
        "A file with the same name already exists in the given directory"
      )
    ).toBeVisible();
  });
});
