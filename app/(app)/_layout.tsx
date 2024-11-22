import { Redirect, Stack } from 'expo-router';
// import { PlatformColor } from 'react-native';

import { useAuth } from '~/hooks/useAuth';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // TODO: When upgrading to sdk 52 use this config to set nice large headers
        // headerShadowVisible: true,
        // headerTransparent: true,
        // headerBlurEffect: 'prominent',
        // headerLargeTitleShadowVisible: false,
        // headerStyle: {
        //   // Hack to ensure the collapsed small header shows the shadow / border.
        //   backgroundColor: 'rgba(255,255,255,0.01)',
        // },
        // headerLargeStyle: {
        //   backgroundColor: PlatformColor('systemGroupedBackgroundColor'), // Color of your background
        // },
        // contentStyle: {
        //   backgroundColor: PlatformColor('systemGroupedBackgroundColor'),
        // },
      }}>
      <Stack.Screen
        name="(tabs)"
        options={
          {
            // title: 'Home',
            // headerLargeTitle: true,
            // headerSearchBarOptions: {},
            // headerRight() {
            //   return <ProfileButton segment={segment} />;
            // },
            // ...(name !== 'index'
            //   ? {
            //       headerLargeTitle: undefined,
            //       headerSearchBarOptions: undefined,
            //     }
            //   : {}),
          }
        }
      />
    </Stack>
  );
}
