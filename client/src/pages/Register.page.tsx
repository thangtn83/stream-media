import React from "react"
import { AuthContainer, Flex } from "../styled"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export type RegisterInputType = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

const Register = () => {
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
          <Box component="form" width={"unset"}>
            <TextField placeholder="Email" type="email" sx={{ mb: 2 }} />
            <TextField placeholder="Name" type="text" sx={{ mb: 2 }} />
            <TextField placeholder="Password" type="password" sx={{ mb: 3 }} />

            <Button>Register</Button>
          </Box>
        </Flex>
      </Box>
      <Box component="article" bgcolor="background.paper"></Box>
    </AuthContainer>
  )
}

export default Register
