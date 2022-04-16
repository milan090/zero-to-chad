import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { ClosableBox } from "src/client/components/ClosableBox.component";
import { HabitsGrid } from "src/client/components/HabitsGrid.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";
import { Rectangle3, Ellipse2 } from "src/icons";

const DashboardPage: NextPage = () => {
  const [username, hasCompletedOnBoarding, loading] = useUserStore(
    ({ username, hasCompletedOnBoarding, loading }) => [
      username,
      hasCompletedOnBoarding,
      loading,
    ]
  );

  const appBarChildren = (
    <Typography variant="h4" fontWeight="600" noWrap component="div">
      {loading ? (
        <Skeleton width={250} variant="text" />
      ) : (
        `Hi there, ${username} 👋`
      )}
    </Typography>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box
        sx={{
          margin: "auto",
          maxWidth: 1300,
          paddinigX: "2rem",
          boxSizing: "content-box",
        }}
      >
        {!hasCompletedOnBoarding && !loading && (
          <ClosableBox>
            <Typography variant="h5" fontWeight="500">
              Complete Your Profile
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ width: "75%" }}>
                Few clicks here and there and we will be able to suggest you
                topics that you like
              </Typography>
              <Link passHref href="/choosetopics">
                <Button
                  variant="contained"
                  color="info"
                  sx={{ borderRadius: "0.5rem", marginTop: "auto" }}
                >
                  Complete
                </Button>
              </Link>
            </Box>
          </ClosableBox>
        )}
        <Typography variant="h4" fontWeight="600" sx={{ paddingTop: 3 }}>
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
                  float: "right",
                  left: 10,
                  marginTop: -1,
                }}
                variant="contained"
              >
                Continue...
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          marginTop: 3,
          minHeight: "70vh",
          paddingTop: "2rem",
          paddingX: "2rem",
        }}
      >
        <Box
          sx={{
            maxWidth: 1300,
            width: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="600">
              Track your habits
            </Typography>
            <Box sx={{ marginTop: "1rem" }}>
              <Box sx={{ display: "flex", marginBottom: "1.5rem" }}>
                <HabitsGrid limit={2} />
              </Box>

              <Link passHref href="/dashboard/habits">
                <Button
                  sx={{
                    width: 95,
                    height: 31,
                    borderRadius: 2,
                    float: "right",
                  }}
                  variant="contained"
                >
                  More...
                </Button>
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="600">
              Quote of the Day
            </Typography>

            <Card
              style={{ backgroundColor: alpha("#FDD47A", 0.65) }}
              sx={{
                width: 477,
                height: 183,
                borderRadius: 4,
                marginTop: "1rem",
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
                    “For every action there is an unequal and greater reaction”
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
    </SideBar>
  );
};

export default DashboardPage;
