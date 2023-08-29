import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useGetProfileQuery } from "../features/users/userAPI"
import FullScreenLoading from "./FullScreenLoading"
import { skipToken } from "@reduxjs/toolkit/dist/query"

type Props = {
  allowedRoles: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const location = useLocation()
  const [{ loged_in }] = useCookies(["loged_in"])
  const { data: user, isLoading, isFetching } = useGetProfileQuery()

  if (isLoading || isFetching) {
    return <FullScreenLoading />
  }

  return loged_in || (user && allowedRoles.includes(user?.role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoute
