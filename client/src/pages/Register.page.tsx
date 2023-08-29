import React from "react"
import { AuthContainer, Flex } from "../styled"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterSchema, RegisterSchemaType } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"

export type RegisterInputType = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    console.log(data)

  console.log(watch("email"))
  return (
    <AuthContainer>
      <Box component="article">
        <Flex
          flexDirection="column"
          alignItems="center"
          maxWidth="500px"
          margin="0 auto"
        >
          <Typography variant="h4" fontWeight="bold">
            Register
          </Typography>
          <Typography variant="body1" mt={2} mb={3}>
            Have an account?&nbsp;
            <Typography component="span" fontWeight={600} color="primary.dark">
              <Link to="/login">Login</Link>
            </Typography>
          </Typography>
          <Box
            component="form"
            width={"unset"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              placeholder="Email"
              type="email"
              sx={{ mb: 2 }}
              {...register("email", { required: true })}
              error={!!errors?.email}
              helperText={errors.email && errors.email.message}
            />
            <TextField placeholder="Name" type="text" sx={{ mb: 2 }} />
            <TextField
              {...register("password")}
              placeholder="Password"
              type="password"
              error={!!errors?.password}
              helperText={errors?.password && errors.password.message}
              sx={{ mb: 2 }}
            />
            <TextField
              {...register("passwordConfirm")}
              placeholder="Confirm password"
              type="password"
              helperText={
                errors?.passwordConfirm && errors.passwordConfirm.message
              }
              sx={{ mb: 3 }}
            />
            <Button type="submit">Register</Button>
          </Box>
        </Flex>
      </Box>
      <Box component="article" bgcolor="background.paper"></Box>
    </AuthContainer>
  )
}

export default Register
