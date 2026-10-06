# Todo app (Full Stack Open Part 12)

Containerized todo application with MongoDB, Redis, Vite frontend, Express backend, and nginx reverse proxy on port **8080**.

## Run with Docker Compose

From this directory:

```bash
docker compose up --build
```

Open http://localhost:8080

API routes are exposed under `/api/*` (for example `/api/todos`, `/api/statistics`).

## E2E tests

With the stack running (or let Playwright start it):

```bash
cd ../todo-tests
npm ci
npx playwright install chromium
npm run test:e2e
```

Playwright uses `http://localhost:8080` as the base URL.
