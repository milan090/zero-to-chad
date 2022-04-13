import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { HabitCard } from "src/client/components/HabitCard.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { Habit } from "src/types/habit.types";

const habits: Habit[] = [
  {
    name: "Read 30 mins",
    frequency: "Everyday",
    streak: 3,
    iconUrl: "/images/habits/bxs_book.svg",
    color: "#EEEFFF",
    uid: "124asds",
  },
  {
    name: "Read 30 mins",
    frequency: "Everyday",
    streak: 3,
    iconUrl: "/images/habits/bxs_book.svg",
    color: "#EEEFFF",
    uid: "124aasds",
  },
];

const DashboardPage: NextPage = () => {
  return (
    <SideBar>
      <Typography variant="h4" fontWeight="600">
        My Habits
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {habits.map((habit) => (
          <HabitCard {...habit} key={habit.uid} />
        ))}
      </Box>
    </SideBar>
  );
};

export default DashboardPage;
