import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';

import { refreshAccessToken } from '../raw-fetch/refresh-access-token';
import { RootState } from '../store';

import { environment } from '~/environment';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiUrl,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        console.log('Successfully refreshed token');
        // Update the token in the store
        api.dispatch({ type: 'auth/setToken', payload: newAccessToken });
        // Retry the original query with new token
        console.log('Retrying original query');
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log('Failed to refresh token, logging out user. Refresh token may have expired');
        api.dispatch({ type: 'auth/logout' });
      }
    } else {
      console.log('No refresh token found, logging out user');
      api.dispatch({ type: 'auth/logout' });
    }
  }
  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: [''],
  endpoints: () => ({}),
});
