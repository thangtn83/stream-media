import React, { useEffect } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import {
  MediaSchema,
  MediaSchemaType,
  MediaType,
} from "../schemas/media.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateMediaMutation } from "../features/media/mediaApi"

type UploadFormConfigType = {
  name: keyof MediaType
} & Partial<TextFieldProps>

const UploadForm = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: "0 auto",
}))

const uploadFormConfigs: UploadFormConfigType[] = [
  {
    name: "title",
    placeholder: "Title",
    type: "text",
  },
  {
    name: "description",
    placeholder: "Description",
    multiline: true,
    rows: 3,
  },
  {
    name: "genre",
    placeholder: "Genre",
    type: "text",
  },
  {
    name: "actors",
    placeholder: "Actors",
    type: "text",
  },
  {
    name: "director",
    placeholder: "Director",
    type: "text",
  },
  {
    name: "thumbnail",
    type: "file",
  },
  {
    name: "video",
    type: "file",
  },
]

const UploadMedia = () => {
  const { register, handleSubmit, reset, formState } = useForm<MediaType>({
    resolver: zodResolver(MediaSchema),
  })
  const { errors } = formState

  const [createMedia, { isSuccess }] = useCreateMediaMutation()

  const uploadMediaHandler: SubmitHandler<MediaSchemaType> = async (
    data,
    e,
  ) => {
    e?.preventDefault()
    try {
      const createMediaFormData = new FormData()
      console.log(data)
      Object.keys(data).forEach((key) => {
        if (key === "thumbnail" || key === "video") {
          const file = data[key][0]
          createMediaFormData.append(key, file)
        } else {
          createMediaFormData.append(key, data[key as keyof MediaSchemaType])
        }
      })
      await createMedia(createMediaFormData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess])

  return (
    <Container>
      <UploadForm
        maxWidth={500}
        component="form"
        onSubmit={handleSubmit(uploadMediaHandler)}
      >
        {uploadFormConfigs.map((config) => (
          <TextField
            key={config.name}
            {...register(config.name)}
            {...config}
            sx={{ mb: 1 }}
            error={errors[config.name] && !!errors[config.name]}
            helperText={
              errors[config.name] && `${errors[config.name]?.message}`
            }
          />
        ))}
        <Button type="submit">Upload</Button>
      </UploadForm>
    </Container>
  )
}

export default UploadMedia
