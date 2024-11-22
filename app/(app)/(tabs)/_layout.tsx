import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { TabBarIcon } from '~/components/TabBarIcon';
import { zincColors } from '~/style/colors';

export default function TabLayout() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDark ? zincColors[900] : zincColors[50],
          borderTopColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: isDark ? zincColors[900] : zincColors[50],
          shadowColor: 'transparent',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
