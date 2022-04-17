/* eslint-disable quotes */
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles/shadows";

export const lightThemeOptions = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FDD47A",
      },
      secondary: {
        main: "#F79322",
        "500": "#FDD47A",
      },
      background: {
        default: "#FDF7E7",
      },
      info: {
        main: "#4CA4FD",
        contrastText: "#fff",
      },
    },
    shadows: Array(25).fill("none") as Shadows,
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      button: {
        borderRadius: "0.5rem",
        textTransform: "none",
        fontWeight: "600",
      },
    },
  })
);
