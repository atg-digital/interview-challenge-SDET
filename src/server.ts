import express from "express";
import { handler } from "./handler";

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(handler);

  return app;
}

if (require.main === module) {
  const app = createServer();
  const port = 3001;

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/booking/summary`);
  });
}
