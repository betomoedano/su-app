import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

import { Button } from '~/components/Button';
import { Text } from '~/components/ui';
import { useAuth } from '~/hooks/useAuth';

export default function Profile() {
  const { logout } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}>
        <Text variant="huge">Profile</Text>
        <Button title="Sign out" onPress={logout} />
      </ScrollView>
    </>
  );
}
