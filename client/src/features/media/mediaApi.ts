import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReAuth } from "../apiSlice"
import { MediaSchemaType, MediaType } from "../../schemas/media.schema"

const mediaApi = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["media"],
  endpoints: (build) => ({
    listMedia: build.query<MediaType[], void>({
      query: () => ({
        url: "/media",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res: { data: { medias: MediaType[] } }) =>
        res.data.medias,
    }),
    createMedia: build.mutation<MediaSchemaType, FormData>({
      query: (media) => ({
        url: "/media/upload",
        method: "POST",
        body: media,
        credentials: "include",
      }),
    }),

    getMedia: build.query<MediaType, string>({
      query: (id) => ({
        url: `/media/${id}`,
        method: "GET",
      }),
      transformResponse: (res: { data: MediaType }) => res.data,
    }),
  }),
})

export const { useCreateMediaMutation, useListMediaQuery, useGetMediaQuery } =
  mediaApi

export default mediaApi
