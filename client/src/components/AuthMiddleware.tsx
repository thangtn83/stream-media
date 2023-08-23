import React from "react"
import { useGetProfileQuery } from "../features/users/userAPI"
import { Outlet } from "react-router-dom"
import FullScreenLoading from "./FullScreenLoading"
const AuthMiddleware = () => {
  const { isLoading, isFetching } = useGetProfileQuery()

  if (isLoading || isFetching) {
    return <FullScreenLoading />
  }
  return <Outlet />
}

export default AuthMiddleware
