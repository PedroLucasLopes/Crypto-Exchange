import { test, expect } from "@playwright/test";

test("Has title", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await expect(page).toHaveTitle(/Crypto Exchange/);
});

test("Has a Select Button to Search Default Coin", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("bitcoin", { exact: true }).click();
});

test("Has a Select Button to Search Default Currency", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("usd", { exact: true }).click();
});

test("Has a Title 🔥Top 15 Trending Coins List", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("🔥Top 15 Trending Coins List").click();
});

test("Has a Title 💎 Coins Information", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("💎 Coins Information").click();
});

test("Click the div to select a new coin", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("bitcoin", { exact: true }).click();
  await page.getByText("cosmos").click();
});

test("Click the div to select a new currency", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("usd", { exact: true }).click();
});

test("Click the div to change chart date", async ({ page }) => {
  await page.goto("https://cryptoexchangedashboard.netlify.app");
  await page.getByText("5 Days", { exact: true }).click();
});
