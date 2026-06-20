import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vestibular.vestibular',
  appName: 'VesTibular',
  webDir: 'dist',
  android: {
    backgroundColor: '#863bff',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#863bff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#863bff',
      overlaysWebView: false,
    },
  },
};

export default config;
