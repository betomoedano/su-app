import '../global.css';

import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '~/app-state/store';
import { setUserCredentials } from '~/features/auth/authSlice';
import { getStorageItem } from '~/helpers/local-storage';
import { useAppDispatch } from '~/hooks/reduxHooks';
import { customDarkTheme, customLightTheme } from '~/style/colors';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const theme = useColorScheme() === 'dark' ? customDarkTheme : customLightTheme;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <ThemeProvider value={theme}>
          <Wrapper />
        </ThemeProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

function Wrapper() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, error] = useFonts({
    'SF-Pro-Display-Black': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Black.otf'),
    'SF-Pro-Display-BlackItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-BlackItalic.otf'),
    'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Bold.otf'),
    'SF-Pro-Display-BoldItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-BoldItalic.otf'),
    'SF-Pro-Display-Heavy': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Heavy.otf'),
    'SF-Pro-Display-HeavyItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-HeavyItalic.otf'),
    'SF-Pro-Display-Light': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Light.otf'),
    'SF-Pro-Display-LightItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-LightItalic.otf'),
    'SF-Pro-Display-Medium': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Medium.otf'),
    'SF-Pro-Display-MediumItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-MediumItalic.otf'),
    'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Display-RegularItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-RegularItalic.otf'),
    'SF-Pro-Display-Semibold': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.otf'),
    'SF-Pro-Display-SemiboldItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-SemiboldItalic.otf'),
    'SF-Pro-Display-Thin': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Thin.otf'),
    'SF-Pro-Display-ThinItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-ThinItalic.otf'),
    'SF-Pro-Display-Ultralight': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-Ultralight.otf'),
    'SF-Pro-Display-UltralightItalic': require('../assets/fonts/SF-Pro-Display/SF-Pro-Display-UltralightItalic.otf'),
  });

  useEffect(() => {
    async function loadStoredAuth() {
      try {
        const rawUser = await getStorageItem('user');
        const token = await getStorageItem('token');
        const refreshToken = await getStorageItem('refreshToken');

        if (refreshToken !== null && token !== null && rawUser !== null) {
          dispatch(
            setUserCredentials({
              user: JSON.parse(rawUser),
              token,
              refreshToken,
            })
          );
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredAuth();

    if (fontsLoaded || error) {
      SplashScreen.hide();
    }
  }, [dispatch, fontsLoaded, error]);

  if (isLoading || !fontsLoaded || error) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}
