import { configureStore } from '@reduxjs/toolkit'
import { shortUrlApi } from './api/shortUrlApi'

export const store = configureStore({
  reducer: {
    [shortUrlApi.reducerPath]: shortUrlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shortUrlApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
