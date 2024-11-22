import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, Text, View } from 'react-native';

import { useRequestCodeMutation } from '~/app-state/services/auth';
import { useAuth } from '~/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [requestCode] = useRequestCodeMutation();

  const handleRequestCode = async () => {
    try {
      await requestCode({ email });
      // Show a message to the user that the code has been sent
    } catch (err) {
      console.error('Error requesting code:', err);
      // Show error message to user
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, code);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Login error:', err);
      // Show error message to user
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button onPress={handleRequestCode} title="Request Code" />
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter verification code"
        keyboardType="numeric"
      />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
}
