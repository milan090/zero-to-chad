import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { ClosableBox } from "src/client/components/ClosableBox.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";
import {
  Rectangle3,
  BookIcon,
  CheckmarkIcon,
  CheckmarkRedIcon,
  AlarmIcon,
  Ellipse2,
} from "src/icons";

import { smolQuote } from "src/client/components/Quote.component";

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
          <Box sx={{ display: "flex" }}>
            <Rectangle3 />
            <CardContent sx={{ right: 100, bottom: 50 }}>
              <Typography variant="h6" fontWeight="600">
                Investing In Crypto
              </Typography>
              <Typography paragraph sx={{ width: 477 }}>
                Lorem ipsum some stuff like that goes here lorem ipsum okay, I
                am too lazy to find lorem ipsum so ill just type some shitz here
              </Typography>
              <Button
                sx={{
                  width: 120,
                  height: 31,
                  bgcolor: "#FDD47A",
                  color: "#000000",
                  float: "right",
                  left: 10,
                  marginTop: -1,
                }}
              >
                Continue...
              </Button>
            </CardContent>
          </Box>
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
            sx={{ marginLeft: 3, marginTop: 3 }}
          >
            Track your habits
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Card
              sx={{
                width: 226,
                height: 234,
                bgcolor: "#EEEFFF",
                marginTop: 3,
                marginBottom: 10,
                marginLeft: 3,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <BookIcon />
                <Typography fontWeight="500">Read 30 mins</Typography>
                <Typography fontWeight="500" color="#79766E">
                  Everyday
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Typography fontWeight="700" color="#79766E">
                    On a 3 day Streak
                  </Typography>
                  <CheckmarkRedIcon style={{ marginLeft: 30 }} />
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: 226,
                height: 234,
                bgcolor: "#F1E2FF",
                marginTop: 3,
                marginBottom: 3,
                marginLeft: 3,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <AlarmIcon />
                <Typography fontWeight="500">Wake up early</Typography>
                <Typography fontWeight="500" color="#79766E">
                  Everyday
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Typography fontWeight="700" color="#79766E">
                    On a 7 day Streak
                  </Typography>
                  <CheckmarkIcon style={{ marginLeft: 30 }} />
                </Box>
              </CardContent>
            </Card>

            <Button
              sx={{
                width: 95,
                height: 31,
                bgcolor: "#FDD47A",
                color: "#000000",
                top: "18rem",
                right: "6rem",
                borderRadius: 2,
              }}
            >
              More...
            </Button>
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginTop: -4, marginLeft: -6 }}
              >
                Quote of the Day
              </Typography>

              <Card
                style={{ backgroundColor: alpha("#FDD47A", 0.65) }}
                sx={{
                  width: 477,
                  height: 183,
                  marginTop: 3,
                  marginLeft: -6,
                  borderRadius: 4,
                }}
              >
                <CardContent>
                  <Ellipse2 />
                  <Box
                    sx={{
                      textAlign: "center",
                      float: "right",
                      width: 303,
                      marginTop: 3,
                      marginRight: 2,
                    }}
                  >
                    <Typography
                      fontStyle="italic"
                      fontSize="1.1rem"
                      fontWeight="400"
                    >
                      “For every action there is an unequal and greater
                      reaction”
                    </Typography>
                    <Typography
                      fontWeight="500"
                      fontSize="1.1rem"
                      sx={{ marginTop: 1 }}
                    >
                      Albert Einstein
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </SideBar>
  );
};

export default DashboardPage;
