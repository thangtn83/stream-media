import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReAuth } from "../apiSlice"
import { IUser, setUser } from "./authSlice"

const userAPI = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: "userApi",
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getProfile: builder.query<IUser, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res: { data: { user: IUser } }) => res.data.user,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        dispatch(setUser({ user: data }))
      },
    }),
  }),
})

export const { useGetProfileQuery } = userAPI
export default userAPI
