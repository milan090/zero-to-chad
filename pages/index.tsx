import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import ProfileIcon from "../public/images/home/carbon_user-avatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase.config";

import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <NextSeo title="Home" />

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Image
          src={"/images/home/bg.svg"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          style={{ zIndex: -100 }}
          alt="Growth background"
        />
        <Box
          marginX="2rem"
          paddingTop="2rem"
          sx={{ display: "flex" }}
          justifyContent="space-between"
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Zero To Chad
          </Typography>
          {user ? (
            <Link href="/dashboard" passHref>
              <Button
                variant="contained"
                sx={{ color: "black", backgroundColor: "#F9B450" }}
                startIcon={<ProfileIcon width="22px" />}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <Button
                variant="contained"
                sx={{ color: "black", backgroundColor: "#F9B450" }}
                startIcon={<ProfileIcon width="22px" />}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            paddingTop: "5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            fontWeight="600"
            sx={{ color: "white", textAlign: "center" }}
          >
            1% Better A Day Equals <br /> 37x Better You In A Year!
          </Typography>
          <Typography textAlign="center">
            Your personal all-in-one self improvement app
          </Typography>
          <Link passHref href={user ? "/dashboard" : "/signup"}>
            <Button
              variant="contained"
              sx={{
                fontSize: "1.2rem",
                marginTop: "1rem",
                borderRadius: "5rem",
                padding: "0.5rem 2rem",
              }}
            >
              Take Action Now!
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
