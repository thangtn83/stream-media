import React from "react"
import { Outlet } from "react-router-dom"
import FullScreenLoading from "./FullScreenLoading"
import { useGetProfileQuery } from "../features/users/userAPI"

const AuthMiddleware = () => {
  const { isLoading, isFetching } = useGetProfileQuery()

  if (isLoading || isFetching) {
    return <FullScreenLoading />
  }
  return <Outlet />
}

export default AuthMiddleware
