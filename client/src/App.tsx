import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, useMediaQuery } from "@mui/material"
import { Login, Home, Register, Profile } from "./pages"
import MainLayout from "./layouts/MainLayout.layout"
import ProtectedRoute from "./components/ProtectedRoute"
import { getDesignTokens } from "./themes/theme"
import "./App.css"
import AuthMiddleware from "./components/AuthMiddleware"
import UploadMedia from "./pages/UploadMedia.page"
import PlayVideo from "./pages/Media.page"
import Media from "./pages/Media.page"

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  return (
    <ThemeProvider theme={getDesignTokens(prefersDarkMode ? "dark" : "light")}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<AuthMiddleware />}>
            <Route index element={<Home />} />
            <Route path="/media/:mediaId" element={<Media />} />
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/profile" element={<Profile />} />
              Ro
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/upload" element={<UploadMedia />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
