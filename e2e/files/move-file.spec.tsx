import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe.serial("Users can move a file", () => {
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

  test("Crete tests files", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Upload file
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

    // Create a folder
    // Open the Create folder dialog
    await page
      .getByRole("button", { name: "Create folder", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Fill the form
    await page.getByLabel("Name").fill(folderName);
    await page.getByRole("button", { name: "Create", exact: true }).click();

    // Assert the folder appears in the UI
    await expect(page.getByText(folderName)).toBeVisible();
  });

  test("Move file", async ({ page }) => {
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
    const moveButton = page.getByRole("menuitem", {
      name: "Move file",
      exact: true
    });
    await expect(moveButton).toBeVisible();
    await moveButton.click();

    // Assert modal is open
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await expect(page.getByText("Move file")).toBeVisible();

    // Select the folder
    const folderCard = modal.getByText(folderName);
    await expect(folderCard).toBeVisible();
    await folderCard.click();

    // Move the file
    await page.getByRole("button", { name: "Move here", exact: true }).click();

    // Assert the modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Assert an alert is shown
    await expect(
      page.getByText("The file has been moved successfully")
    ).toBeVisible();

    // Assert the file is moved
    await expect(page.getByText("yellow.jpg")).not.toBeVisible();
    await page.getByText(folderName).click();
    await expect(page.getByText("yellow.jpg")).toBeVisible();
  });

  test("Cannot move a file to the same folder", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Move to the folder
    await page.getByText(folderName).click();

    // Open the file dropdown
    const fileCard = page.getByRole("button", { name: "yellow.jpg card" });
    await expect(fileCard).toBeVisible();
    await fileCard.getByLabel("More options for yellow.jpg").click();

    // Open the modal
    const moveButton = page.getByRole("menuitem", {
      name: "Move file",
      exact: true
    });
    await expect(moveButton).toBeVisible();
    await moveButton.click();

    // Assert modal is open
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Select the folder
    const folderCard = modal.getByText(folderName);
    await expect(folderCard).toBeVisible();
    await folderCard.click();

    // Move the file
    await page.getByRole("button", { name: "Move here", exact: true }).click();

    // Assert an alert is shown
    await expect(
      page.getByText("The file is already in the given directory")
    ).toBeVisible();
  });
});
