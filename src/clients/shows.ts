export interface Show {
  id: string;
  title: string;
  venueId: string;
  status: "ON_SALE" | "OFF_SALE" | "CANCELLED";
  startTime?: string;
}
export async function getShow(showId: string): Promise<Show> {
  if (showId === "lion-king-london") {
    return {
      id: "lion-king-london-ev",
      title: "The Lion King",
      venueId: "lyceum-london",
      status: "ON_SALE",
      startTime: "2025-12-24T19:30:00Z",
    };
  }

  return {
    id: showId,
    title: "Mystery Show",
    venueId: "unknown-venue",
    status: "OFF_SALE",
  };
}
