import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { PrimaryBox } from "src/client/components/Box.component";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "config/firebase.config";
import { useUserStore } from "src/client/store/user.store";
import { useRouter } from "next/router";
import Link from "next/link";

const ChooseTopicsPage: NextPage = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selectedTopics, setselectedTopics] = useState<string[]>([]);
  const [userUid, hasCompletedOnBoarding] = useUserStore((state) => [
    state.uid,
    state.hasCompletedOnBoarding,
  ]);

  const handleNextClick = () => {
    const userDocRef = doc(db, "users", userUid);
    setSaving(true);
    updateDoc(userDocRef, {
      topics: selectedTopics,
    })
      .then(() => {
        console.log("Updated habits");
        router.push("/choosehabits");
      })
      .catch((err) => console.log(err))
      .finally(() => setSaving(false));
  };

  useEffect(() => {
    if (hasCompletedOnBoarding) {
      router.push("/dashboard");
    }
  }, [hasCompletedOnBoarding]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      {/* <Grid item width="50%"> */}
      <PrimaryBox
        width="100%"
        maxWidth="35rem" //30
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          height: "50vh",
          paddingBottom: "2rem", //8
        }}
      >
        <Typography variant="h4" fontWeight="600" textAlign="center">
          Select The Topics That Interest You
        </Typography>
        <Autocomplete //TODO: remove outline
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={topics}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => setselectedTopics(value.map((e) => e.name))}
          renderInput={(params) => (
            <TextField {...params} label="Topics" placeholder="Science" />
          )}
          sx={{
            width: "500px",
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              opacity: 0,
            },
            "& .MuiInputLabel-shrink": {
              color: "grey !important",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <Link passHref href="/dashboard">
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "6rem", height: "2rem", borderRadius: "0.5rem" }}
            >
              <Typography color="white" fontWeight="500">
                Skip
              </Typography>
            </Button>
          </Link>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextClick}
            sx={{ width: "6rem", height: "2rem", borderRadius: "0.5rem" }}
          >
            {saving ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              <Typography color="white" fontWeight="500">
                Next
              </Typography>
            )}
          </Button>
        </Box>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  );
};

const topics = [
  //TODO: replace with db
  { name: "Technology" },
  { name: "Science" },
];

export default ChooseTopicsPage;
