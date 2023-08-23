import React from "react"
import { Box, CircularProgress, styled } from "@mui/material"

const FullScreenLoadingContainer = styled(Box)({
  width: "100vh",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const FullScreenLoading = () => {
  return (
    <FullScreenLoadingContainer bgcolor={"background.default"}>
      <CircularProgress size={40} color="primary" />
    </FullScreenLoadingContainer>
  )
}

export default FullScreenLoading
