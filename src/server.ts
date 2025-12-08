// src/server.ts

import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { getBookingSummary } from "./bookingOrchestrator";

// small helper to send JSON responses
function sendJson(res: ServerResponse, status: number, body: unknown) {
  const json = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", Buffer.byteLength(json));
  res.end(json);
}

export function createServer() {
  const server = http.createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      if (!req.url || !req.method) {
        return sendJson(res, 400, { error: "Bad request" });
      }

      const method = req.method.toUpperCase();
      const url = new URL(req.url, "http://localhost"); 
      const path = url.pathname;

      if (method === "GET" && path === "/booking/summary") {
        const showId = url.searchParams.get("showId");

        if (!showId) {
          return sendJson(res, 400, {
            error: "showId query param is required",
          });
        }

        try {
          const summary = await getBookingSummary(showId);
          return sendJson(res, 200, summary);
        } catch (err) {
          console.error("Error in getBookingSummary:", err);
          return sendJson(res, 500, { error: "Internal server error" });
        }
      }

      return sendJson(res, 404, { error: "Not found" });
    }
  );

  return server;
}

// Allow `node dist/src/server.js` to run the server directly
if (require.main === module) {
  const server = createServer();
  const port = 3001;

  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/booking/summary`);
  });
}
