import { Box, Container, styled } from "@mui/material"

export const Flex = styled(Box)({
  display: "flex",
})
export const FlexCenter = styled(Flex)({
  alignItems: "center",
  justifyContent: "center",
})

export const AuthContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  "& > article": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:last-child": {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  },
}))
