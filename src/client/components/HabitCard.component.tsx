import { Box, IconButton, Typography } from "@mui/material";
import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Habit } from "src/types/habit.types";
import Image from "next/image";
interface Props extends Habit {
  handleCick?: () => void;
}

export const HabitCard: React.FC<Props> = ({
  iconUrl,
  color,
  name,
  frequency,
  streak,
}) => {
  return (
    <Box>
      <Box
        borderRadius="1rem"
        sx={{
          height: "14.6rem",
          width: "14.1rem",
          backgroundColor: color,
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <Box sx={{ ml: "-5px" }}>
          <Image src={iconUrl} alt={name} width={45} height={45} />
        </Box>

        <Typography fontWeight="600" variant="h5">
          {name}
        </Typography>
        <Typography color="#79766E">{frequency}</Typography>
        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="500" color="#79766E">
            On a {streak} day streak
          </Typography>
          <IconButton>
            <CircleIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
