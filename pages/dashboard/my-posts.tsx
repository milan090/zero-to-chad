import { Box } from "@mui/material";
import { NextPage } from "next";
import { CreateButton } from "src/client/components/CreateButton.component";
import { SideBar } from "src/client/layouts/SideBar.layout";

const DashboardPage: NextPage = () => {
  const appBarChildren = <CreateButton />;

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box></Box>
    </SideBar>
  );
};

export default DashboardPage;
