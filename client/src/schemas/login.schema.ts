import z from "zod"

export const LoginSchema = z.object({
  email: z.string({ required_error: "Required" }).email("Invalid email"),
  password: z.string({ required_error: "Required" }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
