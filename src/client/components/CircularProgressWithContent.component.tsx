import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
  value: number;
};

export const CircularProgressWithContent: React.FC<Props> = ({
  children,
  value,
}) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        value={value}
        color="secondary"
        variant="determinate"
        size={45}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {children}
        </Typography>
      </Box>
    </Box>
  );
};
