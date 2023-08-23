import React from "react"
import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default MainLayout
