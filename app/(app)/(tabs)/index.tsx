import { Stack } from 'expo-router';
import { Button, ScrollView, View } from 'react-native';

import { SignInWithGoogleButton } from '~/components/SignInWithGoogleButton';
import XConnectButton from '~/components/XConnectButton';
import { Text } from '~/components/ui';
import { environment } from '~/environment';
import {
  logout,
  selectAuthToken,
  selectCurrentUser,
  selectRefreshToken,
} from '~/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks';

export default function Home() {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectAuthToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const dispatch = useAppDispatch();

  // console.log(
  //   JSON.stringify(
  //     {
  //       user,
  //       token,
  //       refreshToken,
  //     },
  //     null,
  //     2
  //   )
  // );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-1">
        <View className="flex-1 items-center justify-center px-[16px]">
          <Text variant="huge" className="text-center">
            Build a compelling product. 🚀
          </Text>
          <Text variant="h1" secondary className="font-sf-pro-display-semibold">
            Welcome {user?.displayName}
          </Text>
          {/* 
          <Text variant="headline">You signed in with {user?.provider}</Text>

          <Text variant="headline">The app environment is {environment.apiUrl}</Text>

          <Text variant="paragraph">Start connecting your social accounts.</Text>

          <Text variant="label" secondary>
            Coming soon
          </Text>

          <Text>Environment {environment.apiUrl}</Text>
          <Text>Environment {JSON.stringify(environment)}</Text>
          <Text>Hello {JSON.stringify(user, null, 2)}</Text>
          <Text>Token: {JSON.stringify(token, null, 2)}</Text>
          <Text>Refresh Token: {JSON.stringify(refreshToken, null, 2)}</Text>
          <SignInWithGoogleButton />
          <XConnectButton /> */}
          <Button title="Sign out" onPress={() => dispatch(logout())} />
        </View>
      </ScrollView>
    </>
  );
}
