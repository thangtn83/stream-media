import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { AuthContainer, Flex } from "../styled"

import { useLoginMutation } from "../features/users/authAPI"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchemaType, LoginSchema } from "../schemas/login.schema"

export type LoginInputType = {
  email: string
  password: string
}

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const from = ((location.state as any)?.from.pathname as string) || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

  const [login, { isLoading, isSuccess }] = useLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate(from, {
        replace: true,
      })
    }
  }, [isLoading])

  const submit: SubmitHandler<LoginInputType> = async (data, e) => {
    e?.preventDefault()
    try {
      await login(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContainer>
      <Box component="article">
        <Flex
          flexDirection="column"
          alignItems="center"
          maxWidth="500px"
          margin="0 auto"
          width="100%"
        >
          <Typography variant="h4" fontWeight="bold">
            Login
          </Typography>
          <Typography variant="body1" mt={2} mb={3}>
            Not registered yet?&nbsp;
            <Typography component="span" fontWeight={600} color="primary.dark">
              <Link to="/register">Create an account</Link>
            </Typography>
          </Typography>
          <Box component="form" width="100%" onSubmit={handleSubmit(submit)}>
            <TextField
              {...register("email")}
              placeholder="Email"
              error={!!errors?.email}
              helperText={errors.email && errors.email.message}
              sx={{ mb: 2 }}
            />
            <TextField
              {...register("password")}
              placeholder="Password"
              error={!!errors?.password}
              helperText={errors.password && errors.password.message}
            />
            <Flex justifyContent="space-between" alignItems="center" my={2}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
              </FormGroup>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Forgot your password?
              </Typography>
            </Flex>
            <Button type="submit">Login</Button>
          </Box>
        </Flex>
      </Box>
      <Box component="article" bgcolor="background.paper"></Box>
    </AuthContainer>
  )
}

export default Login
