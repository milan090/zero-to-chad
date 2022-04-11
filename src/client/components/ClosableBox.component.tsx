import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  children: React.ReactNode;
};

export const ClosableBox: React.FC<Props> = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  if (isHidden) {
    return <></>;
  }
  return (
    <Box
      sx={{
        background: "white",
        p: "0.75rem 1.5rem 2rem 1.5rem",
        borderRadius: "1rem",
        boxShadow: "0px 5px 12px #f7932252",
        maxWidth: "40rem",
        overflow: "unset",
        position: "relative",
      }}
    >
      {children}
      <IconButton
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          // backgroundColor: "lightgray",
          color: "gray",
        }}
        onClick={() => setIsHidden(true)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
