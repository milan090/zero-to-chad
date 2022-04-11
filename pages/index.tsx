import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import ProfileIcon from "../public/images/home/carbon_user-avatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase.config";
import { DashboardButton } from "src/client/components/DashboardButton.component";
import Link from "next/link";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <NextSeo title="Home" description="A short description goes here." />

      <main>
        <Box
          marginX="2rem"
          marginTop="2rem"
          sx={{ display: "flex" }}
          justifyContent="space-between"
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Zero To Chad
          </Typography>
          {user ? (
            <DashboardButton />
          ) : (
            <Link href="/login" passHref>
              <Button
                variant="contained"
                startIcon={<ProfileIcon width="22px" />}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </main>
    </div>
  );
};

export default Home;
