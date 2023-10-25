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

  const sharedFolder = faker.system.commonFileName();

  test("Register file owner", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    await expect(page.getByText("Account created successfully")).toBeVisible();
    await page.waitForURL(/\/files$/);
  });

  test("Register another user", async ({ page }) => {
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

  test("Upload a file to share", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Create a folder
    await page.getByRole("button", { name: "Create folder" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByLabel("Name").fill(sharedFolder);
    await page.getByRole("button", { name: "Create", exact: true }).click();

    // Move to the folder
    const folderCard = page.getByRole("button", {
      name: `${sharedFolder} card`
    });
    await expect(folderCard).toBeVisible();
    await folderCard.click();

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

  test("Share the folder with the other user", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the folder dropdown
    const folderCard = page.getByRole("button", {
      name: `${sharedFolder} card`
    });
    await expect(folderCard).toBeVisible();
    await folderCard.getByLabel(`More options for ${sharedFolder}`).click();

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
    await expect(
      page.getByText("The file has been shared successfully")
    ).toBeVisible();

    // Assert the form is reset
    await expect(page.getByLabel("Share with", { exact: true })).toHaveValue(
      ""
    );

    // Assert the username appears in the list
    const userRow = page.getByText(new RegExp(usernameShare, "i"));
    await expect(userRow).toBeVisible();
  });

  test("The other user can see the shared file", async ({ page }) => {
    // Login with the other user
    await page.goto("/login");
    await page.getByLabel("Username").fill(usernameShare);
    await page.getByLabel("Password", { exact: true }).fill(passwordShare);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(page.getByText("No files found here... 🤷")).toBeVisible();

    // Move to the shared files view
    await page.getByRole("button", { name: "Shared with me" }).click();
    await page.waitForURL(/\/shared-with-me$/);

    // Assert the shared folder is shown
    const folderCard = page.getByRole("button", {
      name: `${sharedFolder} card`
    });
    await expect(folderCard).toBeVisible();

    // Open the folder
    await folderCard.click();

    // Assert the shared file is shown
    await expect(page.getByText("yellow.jpg")).toBeVisible();
  });

  test("Users can un-share a file", async ({ page }) => {
    // Login with the owner user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Open the folder dropdown
    const folderCard = page.getByRole("button", {
      name: `${sharedFolder} card`
    });
    await expect(folderCard).toBeVisible();
    await folderCard.getByLabel(`More options for ${sharedFolder}`).click();

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

    // Assert the other user is shown
    const userRow = page.getByText(new RegExp(usernameShare, "i"));
    await expect(userRow).toBeVisible();

    // Unshare the file
    const unShareButton = page.getByRole("button", {
      name: `Un-share with ${usernameShare}`
    });
    await unShareButton.click();

    // Assert an alert is shown
    await expect(page.getByText("File unshared successfully")).toBeVisible();

    // Assert the other user does not appears
    await expect(userRow).not.toBeVisible();
  });
});
