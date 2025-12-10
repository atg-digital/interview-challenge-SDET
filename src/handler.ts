import { Request, Response, Router } from "express";
import { getBookingSummary } from "./bookingOrchestrator";

const router = Router();

router.get("/booking/summary", async (req: Request, res: Response) => {
  const showId = req.query.showId as string;
  const seatIds = req.query.seatIds as string[];

  if (!showId || !seatIds) {
    return res
      .status(400)
      .json({ error: "showId or seatIds query param is required" });
  }

  try {
    const summary = await getBookingSummary(showId, seatIds);
    return res.status(200).json(summary);
  } catch (err) {
    console.error("Error in getBookingSummary:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const handler = router;
