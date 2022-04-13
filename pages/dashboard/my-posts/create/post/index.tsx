import { NextPage } from "next";
import { Box, Button, Paper, Typography } from "@mui/material";
import DocumentIcon from "public/images/dashboard/carbon_document.svg";
import QuotesIcon from "public/images/dashboard/bi_quote.svg";
import { SideBar } from "src/client/layouts/SideBar.layout";
import Link from "next/link";

const CreateRegularPostPage: NextPage = () => {
  return (
    <SideBar>
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
            Regular Post
          </Typography>
          <Typography
            textAlign="center"
            sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
          >
            Lorem ipsum some stuff like that goes here lorem ipsum okay, I am
            too lazy to find lorem ipsum so ill just type some shitz here
          </Typography>
          <Link href="/dashboard/my-posts/create/post/regular" passHref>
            <Button
              variant="contained"
              color="info"
              sx={{ borderRadius: "0.5rem" }}
            >
              Create
            </Button>
          </Link>
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
            <QuotesIcon />
          </Box>
          <Typography fontWeight="600" variant="h5">
            Quote
          </Typography>
          <Typography
            textAlign="center"
            sx={{ marginTop: "0.25rem", marginBottom: "1rem" }}
          >
            Lorem ipsum some stuff like that goes here lorem ipsum okay, I am
            too lazy to find lorem ipsum so ill just type some shitz here
          </Typography>
          <Link href="/dashboard/my-posts/create/post/quote" passHref>
            <Button
              variant="contained"
              color="info"
              sx={{ borderRadius: "0.5rem" }}
            >
              Create
            </Button>
          </Link>
        </Paper>
      </Box>
    </SideBar>
  );
};

export default CreateRegularPostPage;
