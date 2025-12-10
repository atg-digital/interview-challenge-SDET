import { getShow, Show } from "./clients/shows";
import { getSeatsById, Seat } from "./clients/seatmap";
import { getPricingQuote, PricingQuote } from "./clients/pricing";

export interface BookingSeatSummary {
  section: string;
  row: string;
  seatNumber: string;
  restrictedView: boolean;
  price: number;
  fees: number;
  total: number;
}

export interface BookingSummary {
  showId: string;
  title: string;
  venueId: string;
  startTime: string | null;
  seats: Seat[];
  total: PricingQuote;
}

export async function getBookingSummary(
  showId: string,
  seatIds: string[]
): Promise<BookingSummary> {
  const show: Show = await getShow(showId);
  const seats: Seat[] = await getSeatsById(show.venueId, seatIds);
  const pricing: PricingQuote = await getPricingQuote(seats);

  return {
    showId: show.id,
    title: show.title,
    venueId: show.venueId,
    startTime: show.startTime ?? null,
    seats: seats,
    total: pricing,
  };
}
