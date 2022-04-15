import { Box, Button, Skeleton, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { ClosableBox } from "src/client/components/ClosableBox.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";

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
      <Box>
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
      </Box>
    </SideBar>
  );
};

export default DashboardPage;
