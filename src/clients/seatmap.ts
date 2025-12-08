// src/providers/seatmap.ts

export interface Seat {
  section: string;
  row: string;
  seatNumber: string;
  restrictedView?: boolean; // optional, defaults to false
}

export async function getSeatmap(venueId: string): Promise<Seat[]> {
  if (venueId === "lyceum-london") {
    return [
      {
        section: "STALLS",
        row: "A",
        seatNumber: "10",
        restrictedView: false,
      },
      {
        section: "CIRCLE",
        row: "B",
        seatNumber: "5",
      },
    ];
  }

  return [];
}
