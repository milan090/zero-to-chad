import styled from "@emotion/styled"
import { TextField } from "@mui/material"

export const TextInput = styled(TextField)({
  color: "#79766E",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  border: "none",
  height: "3.25rem",
  marginBottom: "1rem",

  "& .MuiInputLabel-root": {
    color: "grey !important",
    top: "-0.25rem",
    left: "1rem",
    fontSize: "1.25em",
  },
  "& .MuiInputLabel-shrink": {
    top: "0.25rem",
    // color: "grey ",
  },
  "& .MuiInputBase-root": {
    padding: "0.25rem 1rem 0 1rem",

    "&:before, &:after": {
      opacity: 0,
    },
  },
  "& .MuiFormHelperText-root": {
    position: "absolute",
    top: "3.2rem",
    left: "0.25rem",
  },
})
