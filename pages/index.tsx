import { Box, Button, SvgIcon, Typography } from "@mui/material"
import type { NextPage } from "next"
import { NextSeo } from "next-seo"
import { useState } from "react"
import ProfileIcon from "../public/images/home/carbon_user-avatar.svg"

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useState(false)

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
          {isAuth ? (
            <Button>My Account</Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<ProfileIcon width="22px" />}
            >
              Login
            </Button>
          )}
        </Box>
      </main>
    </div>
  )
}

export default Home
