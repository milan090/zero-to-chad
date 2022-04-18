/* eslint-disable indent */
import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { NextPage } from "next";
import { PrimaryBox } from "src/client/components/Box.component";
import { HabitManageCard } from "src/client/components/HabitManageCard.component";
import { HabitInfo } from "src/types/habit.types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "config/firebase.config";
import { habitInfoConverter } from "src/services/habits.service";
import { useUserStore } from "src/client/store/user.store";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

//BIG TODO: remove hardcoded values and make it dynamic

const ChooseHabitsPage: NextPage = () => {
  const router = useRouter();
  const [userUid, hasCompletedOnBoarding] = useUserStore((state) => [
    state.uid,
    state.hasCompletedOnBoarding,
  ]);
  const [habits, loading, error] = useCollectionData<HabitInfo>(
    collection(db, "habits").withConverter(habitInfoConverter)
  );
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const setCardSelected = (habitId: string, value: boolean) => {
    if (value) {
      const newHabits = [...selectedHabits, habitId];
      setSelectedHabits(newHabits);

      if (newHabits.length > 3) {
        toast("Training more than 3 habits at a time would be ineffective", {
          icon: "⚠️",
        });
      }
    } else {
      setSelectedHabits(
        selectedHabits.filter((selectedHabitId) => selectedHabitId !== habitId)
      );
    }
  };

  const handleNextClick = () => {
    if (selectedHabits.length < 2) {
      return toast.error("Pick atleast 2 habits");
    }
    const userDocRef = doc(db, "users", userUid);
    setSaving(true);
    updateDoc(userDocRef, {
      habits: selectedHabits,
      hasCompletedOnBoarding: true,
    })
      .then(() => {
        console.log("Updated habits");
        router.push("/dashboard");
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
        maxWidth="65rem" //30
        sx={{
          display: "flex",
          justifyContent: "center", //center
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "2rem", //8
        }}
      >
        <Typography variant="h4" fontWeight="600" textAlign="center">
          Select Your Habits
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: 3,

            padding: "1rem",
            margin: "auto",
            // marginTop: "1.5rem",
            borderRadius: "1rem",
            width: "100%",
            minHeight: "50vh",
            alignContent: "flex-start",
          }}
        >
          {error && "Error"}
          {loading &&
            [1, 2, 3].map((i) => (
              <Box key={i}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={210}
                  height={118}
                  sx={{ borderRadius: "0.5rem" }}
                />
              </Box>
            ))}
          {!loading &&
            !!habits &&
            habits.map((habit) => {
              const { id, name, description } = habit;
              const checked = !!selectedHabits.find((i) => i === id);
              return (
                <HabitManageCard
                  name={name}
                  description={description}
                  checked={checked}
                  key={id}
                  variant="white"
                  handleClick={() => setCardSelected(id, !checked)}
                />
              );
            })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: 950,
            marginTop: 5,
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
            <Typography color="white" fontWeight="500">
              {saving ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                "Next"
              )}
            </Typography>
          </Button>
        </Box>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  );
};

export default ChooseHabitsPage;
