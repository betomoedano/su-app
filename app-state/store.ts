import { configureStore } from '@reduxjs/toolkit';
// import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import { api } from './services/api';

import authReducer from '~/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  // I tried to integrate redux-devtools-extension but it didn't work. App crashes when I try to open the devtools.
  // devTools: false,
  // enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
