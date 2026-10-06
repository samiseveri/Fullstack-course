# Publishing with EAS

This project includes an `eas.json` configuration for [Expo Application Services (EAS)](https://docs.expo.dev/eas/).

Expo account project: [@samiseveri/rate-repository-app](https://expo.dev/accounts/samiseveri/projects/rate-repository-app)

## Prerequisites

1. Install EAS CLI: `npm install -g eas-cli` (or use `npx eas-cli …`)
2. Log in: `eas login`
3. Project ID is already set in `app.config.js` (`extra.eas.projectId`)

## EAS Update (course QR)

```bash
eas update --branch preview --environment preview --message "Part 10 submission"
```

Scan the QR in the README (`assets/eas-update-qr.png`) with Expo Go, or open the update on the [Expo dashboard](https://expo.dev/accounts/samiseveri/projects/rate-repository-app/updates).

## Build

- Development build: `eas build --profile development --platform android`
- Preview build: `eas build --profile preview --platform android`
- Production build: `eas build --profile production --platform all`

## Submit

After a production build completes:

```bash
eas submit --platform android
eas submit --platform ios
```

Set `android.package` / `ios.bundleIdentifier` in `app.config.js` before store submission.
