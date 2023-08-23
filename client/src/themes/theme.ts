import { PaletteMode } from "@mui/material"
import { ThemeOptions, createTheme } from "@mui/material/styles"

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF4F5F",
    },
    secondary: {
      main: "#8101f9",
    },
    background: {
      default: "#1b1b1b",
      paper: "#444444",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c2c2c2",
    },
  },
})

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF4F5F",
    },
    secondary: {
      main: "#8101f9",
    },
    background: {
      default: "#1b1b1b",
      paper: "#444444",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c2c2c2",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          padding: theme.spacing(1),
          width: "100%",
          fontWeight: "600",
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "standard",
        InputProps: {
          disableUnderline: true,
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.spacing(0.5),
          padding: theme.spacing(0.5, 1),
        }),
      },
    },
  },
})

export const getDesignTokens = (mode: PaletteMode): ThemeOptions =>
  mode === "light" ? lightTheme : darkTheme

export default { darkTheme, lightTheme, getDesignTokens }
