import { getShow, Show } from "./clients/shows";
import { getSeatmap, Seat } from "./clients/seatmap";
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
  currency: string;
  seats: BookingSeatSummary[];
}

/**
 * Retrieves a detailed booking summary for a given show.
 *
 * @param showId - The unique identifier of the show for which the booking summary is requested.
 *
 * @returns A promise that resolves to a `BookingSummary` object containing:
 * - `showId`: The unique identifier of the show.
 * - `title`: The title of the show.
 * - `venueId`: The unique identifier of the venue where the show is hosted.
 * - `startTime`: The start time of the show (nullable).
 * - `currency`: The currency used for pricing.
 * - `seats`: An array of `BookingSeatSummary` objects, each containing:
 *   - `section`: The section of the seat in the venue.
 *   - `row`: The row of the seat in the section.
 *   - `seatNumber`: The specific seat number.
 *   - `restrictedView`: A boolean indicating if the seat has a restricted view.
 *   - `price`: The base price of the seat.
 *   - `fees`: Additional fees associated with the seat.
 *   - `total`: The total cost of the seat (price + fees).
 *
 * @throws Will throw an error if fetching the show, seatmap, or pricing quote fails.
 */
export async function getBookingSummary(
  showId: string
): Promise<BookingSummary> {
  const show: Show = await getShow(showId);
  const seats: Seat[] = await getSeatmap(show.venueId);
  const seatIds = seats.map((s) => `${s.section}-${s.row}-${s.seatNumber}`);
  const pricing: PricingQuote = await getPricingQuote({
    showId,
    seatIds,
    pricingStrategy: "STANDARD",
  });

  const pricingMap = new Map(pricing.items.map((item) => [item.seatId, item]));

  const seatSummaries: BookingSeatSummary[] = seats.map((seat) => {
    const seatId = `${seat.section}-${seat.row}-${seat.seatNumber}`;
    const quoteItem = pricingMap.get(seatId);

    const fees = quoteItem?.fees ?? 0;

    return {
      section: seat.section,
      row: seat.row,
      seatNumber: seat.seatNumber,
      restrictedView: seat.restrictedView ?? false,
      price: quoteItem?.price ?? 0,
      fees,
      total: quoteItem?.total ?? 0,
    };
  });

  return {
    showId: show.id,
    title: show.title,
    venueId: show.venueId,
    startTime: show.startTime ?? null,
    currency: pricing.currency,
    seats: seatSummaries,
  };
}
