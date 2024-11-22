import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
  tokenEndpoint: 'https://api.x.com/2/oauth2/token',
  revocationEndpoint: 'https://api.x.com/2/oauth2/revoke',
};

export default function XConnectButton() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'ZDdpa2Q5Zk9zaU1FRF9vZmhCUjU6MTpjaQ',
      redirectUri: makeRedirectUri({
        scheme: 'universe',
      }),
      usePKCE: true,
      scopes: ['tweet.read', 'users.read', 'follows.read', 'follows.write'],
    },
    discovery
  );

  // console.log(request);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // console.log(code);
      // aE9sbkh1RDZCV1oyck9ZS3RrYW5CclpVMEdBRVBfQS1BY2pOeVF3Y09mMHp6OjE3MjczMTI1MTM4MjU6MTowOmFjOjE
    } else if (response?.type === 'cancel') {
      // console.log('User cancelled the request');
    } else if (response?.type === 'error') {
      // console.log('Error', response.error);
    } else {
      // console.log('Unknown response', response);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Connect X"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
