import { test, expect } from "@playwright/test";

test.describe("API – GET /booking/summary", () => {
  test("returns 200 with booking summary for valid showId and seatIds", async ({ request }) => {
    const response = await request.get("/booking/summary", {
      params: {
        showId: "lion-king-london",
        seatIds: "STALLS-A-10, CIRCLE-B-5"
      }
    });

    expect(response.status()).toBe(200);
  });

  test("returns 200 with booking summary for valid showId and a single seatId", async ({ request }) => {
    const response = await request.get("/booking/summary", {
      params: {
        showId: "lion-king-london",
        seatIds: "STALLS-A-10"
      }
    });

    expect(response.status()).toBe(200);
  });

  test.skip("returns ?00 with booking summary for valid showId and an invalid seatIds parameter", async ({
    request
  }) => {
    //BUG: No error is being thrown for an invalid seatIds parameter when one is valid
    const response = await request.get("/booking/summary", {
      params: {
        showId: "lion-king-london",
        seatIds: "STALLS-A-10, invalid-seat-id" // invalid seatIds parameter
      }
    });

    expect(response.status()).toBe(200);
  });

  test("returns 400 with booking summary for empty seatIds parameter", async ({ request }) => {
    const response = await request.get("/booking/summary", {
      params: {
        showId: "lion-king-london",
        seatIds: ""
      }
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({
      error: "showId or seatIds query param is required"
    });
  });

  test("returns 400 with booking summary for missing showId or seatIds", async ({ request }) => {
    const response = await request.get("/booking/summary");

    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({
      error: "showId or seatIds query param is required"
    });
  });

  test.skip("returns 500 with booking summary for invalid parameters", async ({ request }) => {
    // TODO: Implement 500 response mocking
    // expect(response.status()).toBe(500);
    // expect(await response.json()).toEqual({
    //   error: "Internal server error"
    // });
  });
});
