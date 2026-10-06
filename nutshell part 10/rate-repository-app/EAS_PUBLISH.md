# Publishing with EAS

This project includes an `eas.json` configuration for [Expo Application Services (EAS)](https://docs.expo.dev/eas/).

## Prerequisites

1. Install EAS CLI globally: `npm install -g eas-cli`
2. Log in: `eas login`
3. Configure the project: `eas build:configure` (if prompted)

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
