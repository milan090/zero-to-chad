import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { CreateButton } from "src/client/components/CreateButton.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { MyPosts } from "src/client/layouts/MyPosts.layout";
import { MyCollections } from "src/client/layouts/MyCollections.layout";

//TODO: Remove hardcoded values

const MyPostsPage: NextPage = () => {
  const appBarChildren = <CreateButton />;

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box
        sx={{
          maxWidth: 1300,
          margin: "auto",
          paddingX: "2rem",
          paddingBottom: "20rem",
          marginTop: "1rem",
          boxSizing: "content-box",
        }}
      >
        <Typography variant="h4" fontWeight="600" sx={{ paddingBottom: 2 }}>
          Your Collections
        </Typography>

        <MyCollections />

        <Typography variant="h4" fontWeight="600" sx={{ paddingTop: 10 }}>
          Posts
        </Typography>

        <MyPosts />
      </Box>
    </SideBar>
  );
};

export default MyPostsPage;
