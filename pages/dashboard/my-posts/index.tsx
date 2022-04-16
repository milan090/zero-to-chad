import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { CreateButton } from "src/client/components/CreateButton.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import ViewsIcon from "public/images/dashboard/views.svg";
import HeartIcon from "public/images/dashboard/ant-design_heart-filled.svg";
import ShareIcon from "public/images/dashboard/ShareIcon.svg";
import Rectangle1 from "public/images/dashboard/Rectangle1.svg";
import { MyPosts } from "src/client/layouts/MyPosts.layout";

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

        <Box display="flex">
          <Card
            sx={{
              width: 256,
              height: 350,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Rectangle1 />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Typography fontWeight="600">
                Stress Management for Noobs
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ marginTop: "auto" }}
              >
                <Box>
                  <Typography>
                    <ViewsIcon /> 11,352
                  </Typography>
                  <Typography>
                    <HeartIcon /> 6,781
                  </Typography>
                  <Typography>
                    <ShareIcon /> 972
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#79766E",
                    color: "#FFFFFF",
                    width: 72,
                    height: 36,
                    borderRadius: 2,
                    marginTop: "auto",
                  }}
                >
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h4" fontWeight="600" sx={{ paddingTop: 10 }}>
          Posts
        </Typography>

        <MyPosts />
      </Box>
    </SideBar>
  );
};

export default MyPostsPage;
