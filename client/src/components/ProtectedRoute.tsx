import React from "react"
import { useGetProfileQuery } from "../features/users/userAPI"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import { skipToken } from "@reduxjs/toolkit/query"
import { useAppSelector } from "../app/hooks"
import { getCurrentUser } from "../features/users/authSlice"

type Props = {
  allowedRoles: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const location = useLocation()
  const [{ loged_in }] = useCookies(["loged_in"])
  const user = useAppSelector(getCurrentUser)

  return loged_in || (user && allowedRoles.includes(user?.role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoute
