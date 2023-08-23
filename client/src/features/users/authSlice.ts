import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface AuthState {
  user: IUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      window.location.href = "/login"
      return initialState
    },
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
    },
  },
})

export const { logout, setUser } = authSlice.actions

export const getCurrentUser = (state: RootState) => state.auth.user

export default authSlice.reducer

export interface IUser {
  _id: string
  name: string
  email: string
  role: string
  photo: string
  createdAt: Date
  updatedAt: Date
  __v: number
  id: string
}
