# Rate Repository App

Full Stack Open Part 10 — React Native rate-repository application (Expo).

**Monorepo:** https://github.com/samiseveri/Fullstack-course (`nutshell part 10/rate-repository-app`)

## QR code (EAS Update)

> If the QR code is missing from the readme, your submissions will be rejected, and you will fail the course.

Published EAS Update (branch `preview`, message "Part 10 submission"):

- **Dashboard:** https://expo.dev/accounts/samiseveri/projects/rate-repository-app/updates/1e10abd1-5cf4-4512-9020-d388c39f2946
- **Expo Go deep link:** `exp://u.expo.dev/b78ed124-5c3f-4692-8557-28a44816c6b2?channel-name=preview`

![EAS Update QR code](./assets/eas-update-qr.png)

Re-publish:

```bash
npm install -g eas-cli
eas login
cd "nutshell part 10/rate-repository-app"
eas update --branch preview --environment preview --message "Part 10 submission"
```

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
