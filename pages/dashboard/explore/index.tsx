import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { ExploreCollections } from "src/client/layouts/ExploreCollections.layout";
import { RecommendedPosts } from "src/client/layouts/RecommendedPosts.layout";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { Rectangle3 } from "src/icons";

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
            <CardActionArea>
              <Box sx={{ display: "flex" }}>
                <Rectangle3 />
                <CardContent sx={{ right: 100, bottom: 50 }}>
                  <Typography variant="h6" fontWeight="600">
                    Investing In Crypto
                  </Typography>
                  <Typography paragraph sx={{ width: 477 }}>
                    Lorem ipsum some stuff like that goes here lorem ipsum okay,
                    I am too lazy to find lorem ipsum so ill just type some
                    shitz here
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>

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
