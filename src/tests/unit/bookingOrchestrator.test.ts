import { getBookingSummary } from "../../bookingOrchestrator";

describe("getBookingSummary (unit)", () => {
  it("returns a booking summary for a known show", async () => {
    const result = getBookingSummary("lion-king-london-ev", [
      "STALLS-A-10",
      "CIRCLE-B-5",
    ]);

    expect(result).toEqual({
      seats: [
        {
          price: {
            fees: 4.5,
            price: 65,
            total: 69.5,
          },
          restrictedView: false,
          row: "A",
          seatNumber: "10",
          section: "STALLS",
        },
        {
          price: {
            fees: 4.5,
            price: 65,
            total: 69.5,
          },
          row: "B",
          seatNumber: "5",
          section: "CIRCLE",
        },
      ],
      showId: "lion-king-london-ev",
      startTime: "2025-12-24T19:30:00Z",
      title: "The Lion King",
      total: {
        currency: "GBP",
        total: 139,
      },
      venueId: "lyceum-london",
    });
  });
});
