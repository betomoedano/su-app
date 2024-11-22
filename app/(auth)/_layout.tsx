import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { zincColors } from '~/style/colors';
export default function AuthLayout() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: isDark ? zincColors[900] : zincColors[50] },
        }}
      />
    </Stack>
  );
}
