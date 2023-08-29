import React from "react"
import { Box, Button, Container, styled } from "@mui/material"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { Flex } from "../styled"
import { useAppSelector } from "../app/hooks"
import { getCurrentUser } from "../features/users/authSlice"
import { useLogoutMutation } from "../features/users/authAPI"

const HeaderContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3, 10),
}))

const Header = () => {
  const isAuthentication = useAppSelector(getCurrentUser) !== null
  const [{ loged_in }] = useCookies(["loged_in"])
  const [logout] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logout()
    } catch (err) {
      console.log(err)
    }
  }
  console.log(loged_in)
  console.log(isAuthentication)

  return (
    <Box>
      <HeaderContainer>
        <Flex>
          <Box sx={{ mr: "auto" }}>MERN</Box>
          <Box>
            {isAuthentication || loged_in ? (
              <Button onClick={logoutHandler}>Logout</Button>
            ) : (
              <Flex>
                <Button variant="text">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="text">
                  <Link to="register">Register</Link>
                </Button>
              </Flex>
            )}
          </Box>
        </Flex>
      </HeaderContainer>
    </Box>
  )
}

export default Header
