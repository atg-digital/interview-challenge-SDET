import { getBookingSummary } from "../../bookingOrchestrator";

describe("getBookingSummary (unit)", () => {
  it("returns a booking summary for a known show", async () => {
    const result = await getBookingSummary("lion-king-london-ev");

    expect(result.showId).toBe("lion-king-london-ev");
    expect(result.title).toBe("The Lion King");
    expect(result.venueId).toBe("lyceum-london");
    expect(result.currency).toBe("GBP");

    // seats array should be present and non-empty
    expect(Array.isArray(result.seats)).toBe(true);
    expect(result.seats.length).toBeGreaterThan(0);

    const firstSeat = result.seats[0];

    // basic shape checks on one seat
    expect(firstSeat).toHaveProperty("section");
    expect(firstSeat).toHaveProperty("row");
    expect(firstSeat).toHaveProperty("seatNumber");
    expect(firstSeat).toHaveProperty("price");
    expect(firstSeat).toHaveProperty("total");
  });
});
