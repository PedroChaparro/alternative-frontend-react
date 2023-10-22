import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can share files", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const usernameShare = faker.internet.userName();
  const passwordShare = faker.internet.password({ length: 8 });

  test("Register test user share", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(usernameShare);
    await page.getByLabel("Password", { exact: true }).fill(passwordShare);
    await page
      .getByLabel("Confirm Password", { exact: true })
      .fill(passwordShare);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Register test user", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Upload a file to share", async ({ page }) => {
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
    await filesInput.setInputFiles(path.join(__dirname, "data/in/yellow.jpg"));
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert file is shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
  });

  test("Share the uploaded file", async ({ page }) => {
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

    // Select the "Manage access" option
    const shareButton = page.getByRole("menuitem", {
      name: "Manage access",
      exact: true
    });
    await expect(shareButton).toBeVisible();
    await shareButton.click();

    // Assert modal is open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Manage access")).toBeVisible();

    // Share file
    await page.getByLabel("Share with", { exact: true }).fill(usernameShare);
    await page.getByRole("button", { name: "Share", exact: true }).click();

    // Assert an alert is shown
    await expect(page.getByText("File shared successfully")).toBeVisible();
  });
});
