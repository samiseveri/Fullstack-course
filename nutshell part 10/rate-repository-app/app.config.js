import 'dotenv/config';

export default {
  expo: {
    name: 'rate-repository-app',
    slug: 'rate-repository-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      usesCleartextTraffic: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apolloUri: process.env.EXPO_PUBLIC_APOLLO_URI,
      eas: {
        projectId: 'b78ed124-5c3f-4692-8557-28a44816c6b2',
      },
    },
    updates: {
      url: 'https://u.expo.dev/b78ed124-5c3f-4692-8557-28a44816c6b2',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
};
