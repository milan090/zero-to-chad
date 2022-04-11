import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const TextInput = styled(TextField)({
  color: "#79766E",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  border: "none",
  marginBottom: "1rem",

  "& .MuiInputLabel-root": {
    color: "grey !important",
    left: "1rem",
    fontSize: "1.1rem",

    position: "absolute",
  },
  "& .MuiInputLabel-shrink": {
    top: "0.5rem",
    zIndex: "10",
    margin: "0",
    position: "absolute",
  },
  "& .MuiInputBase-root": {
    "&:before, &:after": {
      opacity: 0, // Hide the borders
    },
    margin: "0",
    // "input:-internal-autofill-selected ": {
    //   WebkitBoxShadow: "0 0 0 1000px white inset",
    // },
  },
  "& .MuiInput-input": {
    padding: "1.55rem 1rem 0.5rem 1rem",
    height: "1.5rem",
    borderRadius: "0.5rem",
  },

  // Error message or helper text
  "& .MuiFormHelperText-root": {
    position: "absolute",
    top: "3.5rem",
    left: "0.25rem",
  },
});
