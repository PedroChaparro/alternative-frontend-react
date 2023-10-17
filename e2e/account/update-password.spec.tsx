import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.describe.serial("Users can update their password", () => {
  const username = faker.internet.userName();
  const password = "password";
  const newPassword = faker.internet.password({ length: 8 });

  test("Register test user", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(page.getByText("Account created successfully")).toBeVisible();
  });

  test("Update password", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Go to the profile page
    await page.getByRole("link", { name: "Profile", exact: true }).click();
    await page.waitForURL(/\/profile$/);

    // Check that the username is shown
    await expect(
      page.getByText(username[0].toUpperCase(), { exact: true })
    ).toBeVisible();
    await expect(page.getByText(username)).toBeVisible();

    // Click the update password button
    await page
      .getByRole("tab", { name: "Update password", exact: true })
      .click();

    // Fill the form
    const currentPasswordInput = page.getByLabel("Current password", {
      exact: true
    });
    await currentPasswordInput.fill(password);

    const newPasswordInput = page.getByLabel("New password", { exact: true });
    await newPasswordInput.fill(newPassword);

    const confirmNewPasswordInput = page.getByLabel("Confirm new password", {
      exact: true
    });
    await confirmNewPasswordInput.fill(newPassword);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    // Assert the success message is shown
    await expect(page.getByText("Password updated successfully")).toBeVisible();

    // Assert the form is cleared
    await expect(currentPasswordInput).toHaveValue("");
    await expect(newPasswordInput).toHaveValue("");
    await expect(confirmNewPasswordInput).toHaveValue("");
  });

  test("Update password wrong credentials", async ({ page }) => {
    // Login with the registered user
    await page.goto("/login");
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password", { exact: true }).fill(newPassword);
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await page.waitForURL(/\/files$/);

    // Go to the profile page
    await page.getByRole("link", { name: "Profile", exact: true }).click();
    await page.waitForURL(/\/profile$/);

    // Click the update password button
    await page
      .getByRole("tab", { name: "Update password", exact: true })
      .click();

    // Fill the form
    await page.getByLabel("Current password").fill(password);
    await page.getByLabel("New password", { exact: true }).fill(newPassword);
    await page
      .getByLabel("Confirm new password", { exact: true })
      .fill(newPassword);
    await page.getByRole("button", { name: "Submit", exact: true }).click();

    // Assert the error message is shown
    await expect(page.getByText("unauthorized")).toBeVisible();
  });
});
