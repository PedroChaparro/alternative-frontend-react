import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can download files", () => {
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

    // Upload a file
    const filesInput = page.getByLabel("Choose files to upload", {
      exact: true
    });
    await filesInput.setInputFiles(path.join(__dirname, "data/in/yellow.jpg"));
    await page.getByRole("button", { name: "Upload", exact: true }).click();

    // Assert file is shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
  });

  test("Download file", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Assert file is shown
    const fileCard = page.getByRole("button", { name: "yellow.jpg card" });
    await expect(fileCard).toBeVisible();

    // Download the file
    const downloadPromise = page.waitForEvent("download");
    await fileCard.click();

    const download = await downloadPromise;
    await download.saveAs(path.join(__dirname, "data/out/yellow.jpg"));
  });
});
