// hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { useVerifyCodeMutation } from '~/app-state/services/auth';
import {
  selectCurrentUser,
  selectAuthToken,
  selectRefreshToken,
  logout,
} from '~/features/auth/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectAuthToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const [verifyCode] = useVerifyCodeMutation();

  const login = async (email: string, code: string) => {
    try {
      const response = await verifyCode({ email, code }).unwrap();
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const refreshAuthToken = async () => {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    try {
      // todo
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(logout());
      throw error;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, token, login, refreshAuthToken, logout: logoutUser };
}
