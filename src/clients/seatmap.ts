export interface Seat {
  section: string;
  row: string;
  seatNumber: string;
  restrictedView?: boolean;
  price: {
    price: number;
    fees: number;
    total: number;
  };
}

const seatmapCache: { [key: string]: { seats: Seat[] } } = {
  "lyceum-london": {
    seats: [
      {
        section: "STALLS",
        row: "A",
        seatNumber: "10",
        restrictedView: false,
        price: {
          price: 65,
          fees: 4.5,
          total: 69.5,
        },
      },
      {
        section: "CIRCLE",
        row: "B",
        seatNumber: "5",
        price: {
          price: 65,
          fees: 4.5,
          total: 69.5,
        },
      },
    ],
  },
};

export async function getSeatsById(
  venueId: string,
  seatIds: string[]
): Promise<Seat[]> {
  const venueSeatmap = seatmapCache[venueId];

  if (venueSeatmap) {
    return venueSeatmap.seats.filter((seat) => {
      const seatId = `${seat.section}-${seat.row}-${seat.seatNumber}`;
      return seatIds.includes(seatId);
    });
  }

  return [];
}
