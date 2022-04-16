import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { HabitsGrid } from "src/client/components/HabitsGrid.component";
import { SideBar } from "src/client/layouts/SideBar.layout";

const HabitsPage: NextPage = () => {
  return (
    <SideBar>
      <Box
        sx={{
          maxWidth: 1300,
          margin: "auto",
          marginTop: "2rem",
          paddingX: "2rem",
          boxSizing: "content-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="600">
            My Habits
          </Typography>
          <Link passHref href="/dashboard/habits/manage">
            <Typography
              color="#2F80ED"
              fontWeight="600"
              sx={{ cursor: "pointer" }}
            >
              Manage
            </Typography>
          </Link>
        </Box>
        <Box sx={{ marginTop: "1.5rem" }}>
          <HabitsGrid />
        </Box>
      </Box>
    </SideBar>
  );
};

export default HabitsPage;
