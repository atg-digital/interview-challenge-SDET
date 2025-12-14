import { Seat } from "./seatmap";

export interface PricingItem {
  seatId: string;
  price: number;
  fees?: number;
  total: number;
}

export interface PricingQuote {
  currency: string;
  total: number;
}

export async function getPricingQuote(seats: Seat[]): Promise<PricingQuote> {
  return {
    currency: "GBP",
    total: seats.reduce((sum: number, seat: Seat) => sum + seat.price.total, 0)
  };
}
