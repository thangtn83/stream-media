import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery, baseQueryWithReAuth } from "../apiSlice"
import authSlice, { IUser, logout } from "./authSlice"
import { RegisterInputType } from "../../pages/Register.page"
import { LoginInputType } from "../../pages/Login.page"
import userAPI from "./userAPI"

export const authApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: "authApi",
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<IUser, RegisterInputType>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: { user: IUser } }) =>
        response.data.user,
    }),
    login: builder.mutation<{ status: string }, LoginInputType>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          await dispatch(userAPI.endpoints.getProfile.initiate())
        } catch (err) {
          console.log(err)
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logout())
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useLogoutMutation, useLoginMutation, useRegisterMutation } =
  authApi
