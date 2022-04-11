import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { ClosableBox } from "src/client/components/ClosableBox.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";

const DashboardPage: NextPage = () => {
  const { username } = useUserStore(({ username }) => ({ username }));

  const appBarChildren = (
    <Typography variant="h4" fontWeight="600" noWrap component="div">
      Hi there, {username} 👋
    </Typography>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box>
        <ClosableBox>
          <Typography variant="h5" fontWeight="500">
            Complete Your Profile
          </Typography>
          <Typography sx={{ width: "75%" }}>
            Few clicks here and there and we will be able to suggest you topics
            that you like
          </Typography>
        </ClosableBox>
      </Box>
    </SideBar>
  );
};

export default DashboardPage;
