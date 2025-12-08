export interface PricingItem {
  seatId: string;
  price: number;
  fees?: number; // optional
  total: number;
}

export interface PricingQuote {
  currency: string;
  items: PricingItem[];
}

export type PricingStrategy = "STANDARD" | "PREVIEW" | "LOTTERY";

export async function getPricingQuote(params: {
  showId: string;
  seatIds: string[];
  pricingStrategy: PricingStrategy;
}): Promise<PricingQuote> {
  return {
    currency: "GBP",
    items: params.seatIds.map((seatId) => ({
      seatId,
      price: 65,
      fees: 4.5,
      total: 69.5,
    })),
  };
}
