import { api } from './api';

// Todo: https://linear.app/codewithbeto/issue/SU-38/create-a-package-in-monorepo-to-share-prisma-types-across-all-apps
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  emailVerified: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  provider: string;
  providerId: string | null;
  googleId: string | null;
  appleId: string | null;
  roles: Role[];
  isActive: boolean;
  refreshToken: string | null;
}

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

interface RequestCodeReq {
  email: string;
}

interface VerifyCodeReq {
  code: string;
  email: string;
}

interface VerifyCodeRes {
  statusCode: number;
  success: boolean;
  message: string;
  data: { user: User; accessToken: string; refreshToken: string };
}

export const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    requestCode: builder.mutation<{ message: string }, RequestCodeReq>({
      query: ({ email }) => ({
        url: 'auth/request-code',
        method: 'POST',
        body: { email },
      }),
    }),
    verifyCode: builder.mutation<VerifyCodeRes, VerifyCodeReq>({
      query: ({ code, email }) => ({
        url: 'auth/verify-code',
        method: 'POST',
        body: { code, email },
      }),
    }),
    // refreshToken: builder.mutation<RefreshTokenRes, RefreshTokenReq>({
    //   query: ({ refreshToken }) => ({
    //     url: 'auth/refresh-token',
    //     method: 'POST',
    //     body: { refreshToken },
    //   }),
    // }),
  }),
});

export const { useRequestCodeMutation, useVerifyCodeMutation } = auth;
