import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const API_URL = 'https://api.socialuniverse.app';
const clientId = '1016151594758-0tiqrkjmms1sogup90ia7lq368904fer.apps.googleusercontent.com';
const iosClientId = '1016151594758-eugv53m7e0gao1qc1qgdhrih2se8jsap.apps.googleusercontent.com';

// Todo: get token in client and send to server

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    iosClientId,
    // redirectUri: makeRedirectUri({
    // scheme: 'universe',
    // path: 'redirect',
    // }),
    // redirectUri: 'http://localhost:3002/v1/auth/google/callback',
    scopes: ['profile', 'email'],
  });

  return {
    request,
    response,
    promptAsync,
  };
};

async function googleSignIn(accessToken: string) {
  try {
    const response = await fetch(`${API_URL}/v1/auth/google/callback?access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}
