import { Button } from 'react-native';

import { useGoogleAuth } from '~/hooks/useGoogleAuth';

export function SignInWithGoogleButton() {
  const { promptAsync } = useGoogleAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      console.log('result', result);
      if (result.type === 'success') {
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  return <Button title="Sign in with Google" onPress={handleGoogleSignIn} />;
}
