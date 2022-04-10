import { Box, styled } from "@mui/material";

const boxStyles = {
  borderRadius: "1rem",
  boxShadow: "0px 5px 18px rgba(247, 147, 34, 0.32)",
  padding: "1.5rem 2rem",
};

export const WhiteBox = styled(Box)({
  ...boxStyles,
  color: "white",
});

export const PrimaryBox = styled(Box)(({ theme }) => ({
  ...boxStyles,
  backgroundColor: theme.palette.primary.main,
}));
