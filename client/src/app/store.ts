import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "../features/users/authSlice"
import { apiSlice } from "../features/apiSlice"
import { authApi } from "../features/users/authAPI"
import userAPI from "../features/users/userAPI"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    auth: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      apiSlice.middleware,
      authApi.middleware,
      userAPI.middleware,
    ])
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
