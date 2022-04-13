import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";
import { NextPage } from "next";
import { SideBar } from "src/client/layouts/SideBar.layout";
import HeartIcon from "public/images/dashboard/ant-design_heart-filled.svg";
import ViewsIcon from "public/images/dashboard/views.svg";
import AuthorIcon from "public/images/dashboard/AuthorPic.svg";
import ShareIcon from "public/images/dashboard/ShareIcon.svg";
import Rectangle1 from "public/images/dashboard/Rectangle1.svg";
import Rectangle3 from "public/images/dashboard/Rectangle3.svg";
import Rectangle4 from "public/images/dashboard/Rectangle4.svg";
import Rectangle5 from "public/images/dashboard/Rectangle5.svg";
import Ellipse from "public/images/dashboard/Ellipse.svg";

const ExplorePage: NextPage = () => {
  return (
    <SideBar>
      <Box>
        <Typography variant="h5" fontWeight="600" sx={{ paddingTop: 3 }}>
          You were reading
        </Typography>
        <Card
          sx={{
            position: "relative",
            width: 671,
            height: 146,
            marginTop: 3,
            borderRadius: 4,
          }}
        >
          <CardActionArea>
            <Box sx={{ display: "flex" }}>
              <Rectangle3 />
              <CardContent sx={{ right: 100, bottom: 50 }}>
                <Typography variant="h6" fontWeight="600">
                  Investing In Crypto
                </Typography>
                <Typography paragraph sx={{ width: 477 }}>
                  Lorem ipsum some stuff like that goes here lorem ipsum okay, I
                  am too lazy to find lorem ipsum so ill just type some shitz
                  here
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>

        <Typography variant="h5" fontWeight="600" sx={{ marginTop: 5 }}>
          You might like these Collections
        </Typography>
        <Card sx={{ width: 256, height: 350, borderRadius: 4, marginTop: 3 }}>
          <Rectangle1 />
          <CardContent>
            <Typography fontWeight="600">
              Stress Management for Noobs
            </Typography>
            <Typography fontWeight="400" sx={{ color: "#79766E" }}>
              @milan090
            </Typography>
            <Typography fontWeight="400" sx={{ color: "#79766E" }}>
              5 Posts
            </Typography>
          </CardContent>
          <CardContent>
            <Box sx={{ position: "relative", marginTop: 1 }}>
              <Typography>
                <ViewsIcon /> 11,352
              </Typography>
              <Typography>
                <HeartIcon /> 6,781
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

        <Box
          sx={{
            width: "104.9%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#FFFFFF",
            marginTop: 3,
            marginBottom: -3,
            marginLeft: -3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginTop: 5, marginLeft: 3 }}
          >
            Recommended Posts
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Card
              sx={{
                width: 487,
                height: 501,
                borderRadius: 4,
                bgcolor: "#FDF7E7",
                marginTop: 3,
                marginLeft: 10,
              }}
            >
              <Rectangle4 />
              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  Making a Todo List
                </Typography>
                <Typography paragraph>
                  Lorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here
                  okLorem ipsum shit goes here okLorem ipsum shit goes here ok
                </Typography>
              </CardContent>
            </Card>

            <Card
              style={{ backgroundColor: alpha("#FDD47A", 0.65) }}
              sx={{
                width: 231,
                height: 439,
                borderBottomRightRadius: 4,
                borderTopRightRadius: 4,
                marginTop: 7,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ marginTop: 4 }}
                >
                  <Ellipse />
                  <Typography fontWeight="500" sx={{ color: "#79766E" }}>
                    @milan090
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ marginTop: 2 }}
                >
                  <Rectangle5 />
                  <Typography fontSize="10px" fontWeight="400">
                    Collection Name
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 6,
                    justifyContent: "space-around",
                  }}
                >
                  <Typography sx={{ color: "#79766E" }}>
                    <HeartIcon />
                    58
                  </Typography>
                  <Typography sx={{ color: "#79766E" }}>
                    <ViewsIcon />
                    420
                  </Typography>
                  <ShareIcon />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                position: "relative",
                bgcolor: "#FDF7E7",
                width: 487,
                height: 253,
                borderRadius: 4,
                marginTop: 5,
                marginLeft: 10,
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
                    “Never gonna give you up Never gonna let you down Never
                    gonna run around and desert you Never gonna make you cry”{" "}
                  </Typography>
                  <Typography fontWeight="600" sx={{ marginTop: 1 }}>
                    Rick Astley
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              style={{ backgroundColor: alpha("#FDD47A", 0.65) }}
              sx={{
                position: "relative",
                width: 231,
                height: 231,
                marginTop: 6,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ marginTop: 4 }}
                >
                  <Ellipse />
                  <Typography fontWeight="500" sx={{ color: "#79766E" }}>
                    @milan090
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ marginTop: 1 }}
                >
                  <Rectangle5 />
                  <Typography fontSize="10px" fontWeight="400">
                    Collection Name
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 6,
                    justifyContent: "space-around",
                  }}
                >
                  <Typography sx={{ color: "#79766E" }}>
                    <HeartIcon />
                    58
                  </Typography>
                  <Typography sx={{ color: "#79766E" }}>
                    <ViewsIcon />
                    420
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </SideBar>
  );
};

export default ExplorePage;
