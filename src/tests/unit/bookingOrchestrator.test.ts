import { getBookingSummary } from "../../bookingOrchestrator";

describe("getBookingSummary (unit)", () => {
  it("returns a booking summary for a known show", async () => {
    const result = await getBookingSummary("lion-king-london-ev");

    expect(result).toBeTruthy();
  });
});
