# Welcome!

Thanks for taking a look at this small project. Before the interview, all we’d like you to do is:

- Get the project running locally
- Have a quick look around the code
- Spend a little time understanding the **`bookingOrchestrator`** function
- Get a feel for how the clients and booking flow work

**We do not want you to write any code or tests beforehand.**
Just be familiar enough that the project isn’t completely new when we start pairing.

In the interview, we’ll spend about **45 minutes pairing with two of our engineers** to walk through the code and extend part of it together. The goal is simply to see how you think about testing and APIs.

If anything doesn’t run or you get stuck, don’t worry — we’ll help you on the day.
Looking forward to pairing with you!

## Project Summary

This project is a small example service you’ll explore during the pairing session. It exposes a single API endpoint that returns a booking summary by combining data from a few simple mock providers.

You don’t need to know every detail beforehand, but it’s helpful to look at:

- The **`bookingOrchestrator`** function
- What the mock providers return
- How the final response is structured

During the interview, we’ll walk through the flow together and extend a small part of it. The project is intentionally simple so we can focus on your **testing approach, reasoning, and collaboration**, not on building features.

Again, **you don’t need to write anything before the interview** — just get it running and explore the code briefly.

## Project Structure (quick overview)

```
src/
  bookingOrchestrator.ts     # Main booking orchestration logic
  server.ts                  # Minimal HTTP wrapper exposing the endpoint
  providers/
    shows.ts                 # Mock Shows Service
    seatmap.ts               # Mock Seatmap Service
    pricing.ts               # Mock Pricing Service
  types.ts                   # Shared domain types

tests/
  integration/               # Jest integration tests
  playwright/                # Playwright API tests
```

## Endpoint Overview

This project exposes one main HTTP endpoint:

### **GET /booking/summary?showId={id}**

Example: `GET /booking/summary?showId=lion-king-london`

This endpoint pulls together data from three internal “services”:

- **Shows Service** – basic show info (title, venue, start time)
- **Seatmap Service** – seat layout for the venue
- **Pricing Service** – ticket prices and fees

The logic that combines everything lives in: `src/bookingOrchestrator.ts`

#### Example Response

```json
{
  "showId": "lion-king-london-ev",
  "title": "The Lion King",
  "venueId": "lyceum-london",
  "startTime": "2025-12-24T19:30:00Z",
  "currency": "GBP",
  "seats": [
    {
      "section": "STALLS",
      "row": "A",
      "seatNumber": "10",
      "restrictedView": false,
      "price": 65,
      "fees": 4.5,
      "total": 69.5
    },
    {
      "section": "CIRCLE",
      "row": "B",
      "seatNumber": "5",
      "restrictedView": false,
      "price": 65,
      "fees": 4.5,
      "total": 69.5
    }
  ]
}
```

## How to Run the Application

1. **Install Dependencies**  
   Ensure you have Node.js installed. Then, run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. **Start the Application**  
   Use the following command to start the application:

   ```bash
   npm start
   ```

## How to Run the Tests

**Run Unit Tests**  
 To execute the Jest test suite, use:

```bash
npm test:jest
```

**Run API Tests**  
 To execute the API test suite, use:

```bash
npm test:api
```

**Run Integration Tests**  
 To execute the API test suite, use:

```bash
npm test:integration
```

**Run All Test Suites**  
 To execute the API test suite, use:

```bash
npm test
```
