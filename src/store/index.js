import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import phaseReducer from './slices/phaseSlice'
import teamReducer from './slices/teamSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    phase: phaseReducer,
    team: teamReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setTokens'],
        ignoredPaths: ['auth.tokens'],
      },
    }),
})