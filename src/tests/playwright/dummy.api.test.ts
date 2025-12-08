import { test, expect } from "@playwright/test";

test.describe("Playwright API – GET /booking/summary", () => {
  test("returns a booking summary for a known show", async ({ request }) => {
    const response = await request.get("/booking/summary", {
      params: { showId: "lion-king-london-ev" },
    });

    expect(response.ok()).toBeTruthy();
  });
});
