import request from "supertest";
import { createServer } from "../../server";

describe("GET /booking/summary (HTTP integration)", () => {
  const server = createServer();

  it("returns a booking summary for a valid showId", async () => {
    const res = await request(server)
      .get("/booking/summary")
      .query({ showId: "lion-king-london" });

    expect(res.status).toBe(200);
  });
});
