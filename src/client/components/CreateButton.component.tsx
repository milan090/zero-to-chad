import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export const CreateButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      color="info"
      sx={{
        fontWeight: "500",
        borderRadius: "0.5rem",
        fontSize: "1.1rem",
        py: "0.25rem",
      }}
      startIcon={<AddIcon />}
    >
      Create
    </Button>
  );
};
