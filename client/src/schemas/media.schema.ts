import { z } from "zod"
import { IUser } from "../features/users/authSlice"

export const MediaSchema = z.object({
  video: z.any().refine((file: File) => file?.length === 1, "Video is require"),
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .refine((i) => i.length < 300, "Max length is 300"),
  thumbnail: z
    .any()
    .refine((file: File) => file.length === 1, "Thumbnail is require"),
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted.",
  // ),
})

type MediaInfo = {
  _id: string
  postedBy: IUser
  ratings: { source: string; value: string }[]
  runTime: number
  released: number
  views: number
  genre: string[]
  actors: string[]
  director: string
}

export type MediaSchemaType = z.infer<typeof MediaSchema>

export type MediaType = MediaSchemaType & MediaInfo
