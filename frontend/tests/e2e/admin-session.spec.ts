import { expect, test } from "@playwright/test";

test("admin tabs refresh their role when the shared session changes", async ({
  browser,
}) => {
  let currentRole: "owner" | "seo" = "owner";
  const context = await browser.newContext();
  await context.route("**/api/admin/**", async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace(/^\/api\/admin/, "");
    if (path === "/session") {
      await route.fulfill({ json: { ok: true, role: currentRole } });
      return;
    }
    if (path === "/overview") {
      await route.fulfill({ json: { ok: true, counts: {} } });
      return;
    }
    if (path === "/customers") {
      await route.fulfill({ json: { ok: true, items: [] } });
      return;
    }
    await route.fulfill({ json: { ok: true, items: [] } });
  });

  const ownerTab = await context.newPage();
  await ownerTab.goto("/vistar-console");
  await expect(ownerTab.getByText("OWNER", { exact: true })).toBeVisible();
  await ownerTab.getByRole("button", { name: "Customers", exact: true }).click();
  await expect(ownerTab.getByRole("heading", { name: "Customer directory" })).toBeVisible();

  const seoTab = await context.newPage();
  currentRole = "seo";
  await seoTab.goto("/vistar-console");
  await expect(seoTab.getByText("SEO EDITOR", { exact: true })).toBeVisible();
  await seoTab.evaluate(() =>
    localStorage.setItem("vistar-admin-session-changed", String(Date.now())),
  );

  await expect(ownerTab.getByText("SEO EDITOR", { exact: true })).toBeVisible();
  await expect(ownerTab.getByRole("button", { name: "Customers", exact: true })).toHaveCount(0);
  await expect(ownerTab.getByRole("heading", { name: "Continue working" })).toBeVisible();
  await context.close();
});
