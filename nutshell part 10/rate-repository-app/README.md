# Rate Repository App

Full Stack Open Part 10 — React Native rate-repository application (Expo).

**Monorepo:** https://github.com/samiseveri/Fullstack-course (`nutshell part 10/rate-repository-app`)

## QR code (EAS Update)

> If the QR code is missing from the readme, your submissions will be rejected, and you will fail the course.

Publish with EAS Update, then replace the image below with a screenshot of the Expo QR code for that update (Expo Go / emulator):

```bash
npm install -g eas-cli
eas login
eas update --branch preview --message "Part 10 submission"
```

![EAS Update QR code](./assets/eas-update-qr.png)

## Setup

```bash
npm install
# Start the GraphQL API from ../rate-repository-api first (port 4000)
npx expo start
```

Environment (`.env`):

```
EXPO_PUBLIC_APOLLO_URI=http://localhost:4000
```

On a physical device, use your machine's LAN IP instead of `localhost`.

## Scripts

- `npm start` — Expo dev server
- `npm test` — Jest + React Native Testing Library
- `npm run lint` — ESLint

## Publishing

See [EAS_PUBLISH.md](./EAS_PUBLISH.md).
