import { Box, Button, Skeleton, Typography } from "@mui/material";
import { db } from "config/firebase.config";
import { collection, limit, query, where } from "firebase/firestore";
import { NextPage } from "next";

import Link from "next/link";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ClosableBox } from "src/client/components/ClosableBox.component";
import { HabitsGrid } from "src/client/components/HabitsGrid.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";

import { MyQuotePostCard } from "src/client/components/QuotePostCard.component";
import { LastReadCollection } from "src/client/components/LastReadCollection.component";
import { quotePostConverter } from "src/services/post.service";

const DashboardPage: NextPage = () => {
  const [username, hasCompletedOnBoarding, lastReadCollectionId, loading] =
    useUserStore(
      ({ username, hasCompletedOnBoarding, lastReadCollectionId, loading }) => [
        username,
        hasCompletedOnBoarding,
        lastReadCollectionId,
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
          paddingX: "2rem",
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
        <LastReadCollection />
        {!lastReadCollectionId && !loading && (
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ paddingTop: 3, marginBottom: "1rem" }}
            >
              You are not reading anything!
            </Typography>
            <Link href="/dashboard/explore" passHref>
              <Button variant="contained">Start Reading Now!</Button>
            </Link>
          </Box>
        )}
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

          <Box sx={{ maxWidth: 500, width: "100%" }}>
            <Typography variant="h4" fontWeight="600">
              Quote of the Day
            </Typography>

            <QuoteOfTheDay />
          </Box>
        </Box>
      </Box>
    </SideBar>
  );
};

const QuoteOfTheDay: React.FC = () => {
  const [quotes, quoteLoading] = useCollectionData(
    query(
      collection(db, "posts").withConverter(quotePostConverter),
      where("type", "==", "quote"),
      where("tags", "array-contains-any", ["self-improvement", "philosophy"]),
      limit(1)
    )
  );

  if (quoteLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={300}
        height={200}
        sx={{ marginTop: "1rem" }}
      />
    );
  }

  if (!quotes?.length) {
    return <></>;
  }
  const quote = quotes[0];

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <MyQuotePostCard {...quote} />
    </Box>
  );
};

export default DashboardPage;
