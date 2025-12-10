import { test, expect } from "@playwright/test";

test.describe("API – GET /booking/summary", () => {
  test("returns 200 with booking summary for valid showId and seatIds", async ({
    request,
  }) => {
    const response = await request.get("/booking/summary", {
      params: {
        showId: "lion-king-london",
        seatIds: "STALLS-A-10, CIRCLE-B-5",
      },
    });

    expect(response.status()).toBe(200);
  });
});
