import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can rename files", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const fileNewName = "yellow-renamed.jpg";

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

    // Upload a file
    const filesInput = page.getByLabel("Choose files to upload", {
      exact: true
    });
    await filesInput.setInputFiles(path.join(__dirname, "data/yellow.jpg"));
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert file is shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
  });

  test("Rename file", async ({ page }) => {
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
    const renameButton = page.getByRole("menuitem", {
      name: "Rename file",
      exact: true
    });
    await expect(renameButton).toBeVisible();
    await renameButton.click();

    // Assert modal is open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Rename file")).toBeVisible();

    // Rename file
    await page.getByLabel("New name", { exact: true }).fill(fileNewName);
    await page.getByRole("button", { name: "Rename", exact: true }).click();

    // Assert modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert an alert is shown
    await expect(
      page.getByText("The file has been renamed successfully")
    ).toBeVisible();

    // Assert file is renamed
    await expect(page.getByText("yellow.jpg")).not.toBeVisible();
    await expect(page.getByText(fileNewName)).toBeVisible();
  });
});
