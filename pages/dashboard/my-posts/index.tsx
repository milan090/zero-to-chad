import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { CreateButton } from "src/client/components/CreateButton.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import ViewsIcon from "public/images/dashboard/views.svg";
import HeartIcon from "public/images/dashboard/ant-design_heart-filled.svg";
import ShareIcon from "public/images/dashboard/ShareIcon.svg";
import AuthorIcon from "public/images/dashboard/AuthorPic.svg";
import Rectangle1 from "public/images/dashboard/Rectangle1.svg";
import Rectangle2 from "public/images/dashboard/Rectangle2.svg";

//TODO: Remove hardcoded values

const MyPostsPage: NextPage = () => {
  const appBarChildren = <CreateButton />;

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box sx={{ maxWidth: 1300, margin: "auto" }}>
        <Typography variant="h5" fontWeight="600" sx={{ paddingBottom: 2 }}>
          Your Collections
        </Typography>

        <Card sx={{ width: 256, height: 350, borderRadius: 4 }}>
          <Rectangle1 />
          <CardContent>
            <Typography fontWeight="600">
              Stress Management for Noobs
            </Typography>
          </CardContent>

          <CardContent>
            <Box sx={{ position: "relative", top: 40 }}>
              <Typography>
                <ViewsIcon /> 11,352
              </Typography>
              <Typography>
                <HeartIcon /> 6,781
              </Typography>
              <Typography>
                <ShareIcon /> 972
              </Typography>
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#79766E",
                    color: "#FFFFFF",
                    width: 72,
                    height: 36,
                    borderRadius: 2,
                    position: "relative",
                    left: 135,
                    bottom: 50,
                  }}
                >
                  View
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h5" fontWeight="600" sx={{ paddingTop: 10 }}>
          Posts
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ width: 487, height: 501, borderRadius: 4, marginTop: 4 }}>
            <Rectangle2 />
            <CardContent>
              <Typography fontWeight="600">Making a Todo List</Typography>
              <Typography paragraph sx={{ paddingTop: 1 }}>
                Lorem ipsum shit goes here okLorem ipsum shit goes here okLorem
                ipsum shit goes here okLorem ipsum shit goes here okLorem ipsum
                shit goes here okLorem ipsum shit goes here okLorem ipsum shit
                goes here okLorem ipsum shit goes here okLorem ipsum shit goes
                here okLorem ipsum shit goes here okLorem ipsum shit goes here
                okLorem ipsum shit goes here okLorem ipsum shit goes here
                okLorem ipsum shit goes here okLorem ipsum shit goes here
                okLorem ipsum shit goes here ok
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              display: "flex",
              position: "relative",
              width: 487,
              height: 253,
              borderRadius: 4,
              marginTop: 4,
              marginLeft: 4,
            }}
          >
            <CardContent>
              <AuthorIcon />
              <Box
                sx={{
                  textAlign: "center",
                  float: "right",
                  width: 250,
                  marginLeft: 5,
                  marginTop: 1,
                }}
              >
                <Typography fontWeight="400">
                  {" "}
                  “Never gonna give you up Never gonna let you down Never gonna
                  run around and desert you Never gonna make you cry”{" "}
                </Typography>
                <Typography fontWeight="600" sx={{ marginTop: 1 }}>
                  Rick Astley
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </SideBar>
  );
};

export default MyPostsPage;
