import { Box, IconButton, Typography } from "@mui/material";
import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import {
  HabitInfo,
  UserHabitData,
  UserHabitDataDoc,
} from "src/types/habit.types";
import { useUserStore } from "../store/user.store";
import {
  doc,
  DocumentReference,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "config/firebase.config";
import { getYesterdayDate, willOccur } from "src/services/helpers";
import CircleChecked from "@mui/icons-material/CheckCircle";
import toast from "react-hot-toast";

interface Props extends HabitInfo {
  handleCick?: () => void;
  frequency?: string;
  userHabitData: UserHabitData | undefined;
}

const toastBabySteps = () => {
  // probability of 3
  if (willOccur(1 / 3)) {
    toast.success("Start with Baby steps. One at a time. Keep Grinding ‎️‍🔥", {
      duration: 5000,
    });
  }
};

export const HabitCard: React.FC<Props> = ({
  iconUrl,
  color,
  name,
  frequency = "Everyday",
  userHabitData,
  id,
}) => {
  const [userUid] = useUserStore(({ uid }) => [uid]);

  const today = new Date();
  const streak = userHabitData?.streak || 0;
  const checkedIn =
    today.toDateString() === userHabitData?.lastCheckedInDate.toDateString();

  const handleCheckIn = () => {
    const ref = doc(
      db,
      `users/${userUid}/habitsData`,
      id
    ) as DocumentReference<UserHabitDataDoc>;

    if (userHabitData) {
      const { lastCheckedInDate } = userHabitData;
      const isStreak =
        lastCheckedInDate.toDateString() === getYesterdayDate().toDateString();

      const newStreak = isStreak ? userHabitData.streak + 1 : 0; // Reset streak if last check in was not yesterday
      updateDoc(ref, {
        streak: newStreak,
        lastCheckedInDate: Timestamp.now(),
      })
        .then(() => {
          console.log(newStreak);
          if (newStreak === 1) {
            toastBabySteps();
          } else if (newStreak === 2 && willOccur(3 / 4)) {
            toast.success(
              "Congrats on making it to the 2nd day! Keep Grinding ‎️‍🔥",
              {
                duration: 5000,
              }
            );
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDoc(ref, {
        lastCheckedInDate: Timestamp.now(),
        streak: 1,
      });
      toastBabySteps();
    }
  };
  return (
    <Box>
      <Box
        borderRadius="1rem"
        sx={{
          height: "14.6rem",
          width: "14.1rem",
          backgroundColor: color,
          p: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ ml: "-5px" }}>
          <img src={iconUrl} alt={name} width={45} height={45} />
        </Box>

        <Typography fontWeight="600" variant="h5">
          {name}
        </Typography>
        <Typography color="#79766E">{frequency}</Typography>
        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="500" color="#79766E">
            On a {streak} day streak
          </Typography>
          <IconButton onClick={handleCheckIn} disabled={checkedIn}>
            {checkedIn ? <CircleChecked /> : <CircleIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
