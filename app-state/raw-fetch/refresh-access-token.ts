import { environment } from '~/environment';

interface RefreshTokenRes {
  statusCode: number;
  success: boolean;
  message: string;
  data: { accessToken: string };
}

export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${environment.apiUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data: RefreshTokenRes = await response.json();
    return data.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}
