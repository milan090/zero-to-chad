import styled from "@emotion/styled"
import { TextField } from "@mui/material"

export const TextInput = styled(TextField)({
  color: "#79766E",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  border: "none",

  "& .MuiInputLabel-root": {
    color: "grey",
    // marginLeft: "1.25rem",
    // marginBottom: "1.5rem",
    top: "-0.25rem",
    left: "1rem",
    fontSize: "1.25em",
  },
  "& .MuiInputLabel-shrink": {
    top: "0.25rem",
  },
  "& .MuiInputBase-root": {
    padding: "0.25rem 1rem 0 1rem",

    "&:before, &:after": {
      opacity: 0,
    },
  },
})
