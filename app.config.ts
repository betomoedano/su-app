import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'universe',
  slug: 'universe',
  owner: 'betoatexpo',
  version: '1.0.0',
  scheme: 'universe',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent',
      },
    ],
    'expo-secure-store',
    ['expo-font'],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#fafafa',
        image: './assets/splash-dark-icon.png',
        imageWidth: 100,
        // dark: {
        //   image: './assets/splash-icon.png',
        //   backgroundColor: '#18181b',
        // },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  // splash: {
  //   image: './assets/splash.png',
  //   resizeMode: 'cover',
  //   backgroundColor: '#FAFAFA',
  // },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'dev.codewithbeto.universe',
    config: {
      usesNonExemptEncryption: false,
    },
    // splash: {
    //   image: './assets/splash.png',
    //   resizeMode: 'cover',
    //   backgroundColor: '#FAFAFA',
    //   dark: {
    //     image: './assets/splash-dark.png',
    //     resizeMode: 'cover',
    //     backgroundColor: '#18181B',
    //   },
    // },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'dev.codewithbeto.universe',
    // splash: {
    //   image: './assets/splash.png',
    //   resizeMode: 'cover',
    //   backgroundColor: '#FAFAFA',
    //   dark: {
    //     image: './assets/splash-dark.png',
    //     resizeMode: 'cover',
    //     backgroundColor: '#18181B',
    //   },
    // },
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '7a0529b7-e0b3-4211-8bdc-595853273aa1',
    },
    environment: process.env.APP_ENV || 'development',
  },
  updates: {
    url: 'https://u.expo.dev/7a0529b7-e0b3-4211-8bdc-595853273aa1',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});
