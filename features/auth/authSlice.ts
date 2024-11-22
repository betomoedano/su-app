import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { auth, User } from '~/app-state/services/auth';
import { RootState } from '~/app-state/store';
import { removeStorageItem, setStorageItem } from '~/helpers/local-storage';

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setUserCredentials: (
      state,
      { payload: { user, token, refreshToken } }: PayloadAction<AuthState>
    ) => {
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;

      setStorageItem('token', payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      removeStorageItem('user');
      removeStorageItem('token');
      removeStorageItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(auth.endpoints.verifyCode.matchFulfilled, (state, { payload }) => {
      state.user = payload.data.user;
      state.token = payload.data.accessToken;
      state.refreshToken = payload.data.refreshToken;

      setStorageItem('user', JSON.stringify(payload.data.user));
      setStorageItem('token', payload.data.accessToken);
      setStorageItem('refreshToken', payload.data.refreshToken);
    });
  },
});

export const { logout, setUserCredentials, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
