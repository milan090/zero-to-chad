import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { LastReadCollection } from "src/client/components/LastReadCollection.component";
import { ExploreCollections } from "src/client/layouts/ExploreCollections.layout";
import { RecommendedPosts } from "src/client/layouts/RecommendedPosts.layout";
import { SideBar } from "src/client/layouts/SideBar.layout";

//Good luck understanding wtf I wrote
const ExplorePage: NextPage = () => {
  return (
    <SideBar>
      <Box>
        <Box
          sx={{
            maxWidth: 1300,
            margin: "auto",
            paddingX: "2rem",
            boxSizing: "content-box",
            paddingBottom: "10rem",
          }}
        >
          <LastReadCollection />

          <Typography
            variant="h4"
            fontWeight="600"
            sx={{ marginTop: 5, marginBottom: 2 }}
          >
            You might like these Collections
          </Typography>
          <ExploreCollections />
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="h4"
              fontWeight="600"
              sx={{ marginTop: 5, marginBottom: 2 }}
            >
              Recommended Posts For You
            </Typography>
            <RecommendedPosts />
          </Box>
        </Box>
      </Box>
    </SideBar>
  );
};

export default ExplorePage;
