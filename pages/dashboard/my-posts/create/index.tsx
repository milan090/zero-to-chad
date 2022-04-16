import { NextPage } from "next";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { SideBar } from "src/client/layouts/SideBar.layout";
import NextLink from "next/link";
import DocumentIcon from "public/images/dashboard/carbon_document.svg";
import CollectionIcon from "public/images/dashboard/fluent_collections-20-regular.svg";

const CreatePage: NextPage = () => {
  const appBarChildren = (
    <Breadcrumbs aria-label="breadcrumb">
      <NextLink href="/dashboard/my-posts" passHref>
        <Link underline="hover" color="inherit">
          My Posts
        </Link>
      </NextLink>

      <Typography color="text.primary">Create</Typography>
    </Breadcrumbs>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "5rem",
            justifyContent: "center",
            marginTop: "7rem",
            flexWrap: "wrap",
          }}
        >
          <Paper
            sx={{
              p: "3rem 2rem 3rem 2rem",
              maxWidth: "20rem",
              minWidth: "10rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: "-3rem" }}>
              <DocumentIcon />
            </Box>
            <Typography fontWeight="600" variant="h5">
              Post
            </Typography>

            <Typography
              textAlign="center"
              sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
            >
              Lorem ipsum some stuff like that goes here lorem ipsum okay, I am
              too lazy to find lorem ipsum so ill just type some shitz here
            </Typography>
            <NextLink href="/dashboard/my-posts/create/post" passHref>
              <Button
                variant="contained"
                color="info"
                sx={{ borderRadius: "0.5rem" }}
              >
                Create
              </Button>
            </NextLink>
          </Paper>

          <Paper
            sx={{
              p: "3rem 2rem 3rem 2rem",
              maxWidth: "20rem",
              minWidth: "10rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: "-3rem" }}>
              <CollectionIcon />
            </Box>
            <Typography fontWeight="600" variant="h5">
              Collection
            </Typography>
            <Typography
              textAlign="center"
              sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
            >
              Lorem ipsum some stuff like that goes here lorem ipsum okay, I am
              too lazy to find lorem ipsum so ill just type some shitz here
            </Typography>
            <NextLink href="/dashboard/my-posts/create/collection" passHref>
              <Button
                variant="contained"
                color="info"
                sx={{ borderRadius: "0.5rem" }}
              >
                Create
              </Button>
            </NextLink>
          </Paper>
        </Box>
      </Box>
    </SideBar>
  );
};

export default CreatePage;
