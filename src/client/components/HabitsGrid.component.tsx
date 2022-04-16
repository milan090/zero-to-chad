import { Box, Skeleton } from "@mui/material";
import { db } from "config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  habitInfoConverter,
  userHabitDataConverter,
} from "src/services/habits.service";
import { HabitInfo, UserHabitData } from "src/types/habit.types";
import { useUserStore } from "../store/user.store";
import { HabitCard } from "./HabitCard.component";

type Props = {
  limit?: number;
};

export const HabitsGrid: React.FC<Props> = ({ limit = 100 } = {}) => {
  const [userUid, userHabits, userLoading] = useUserStore(
    ({ uid, habits, loading }) => [uid, habits, loading]
  );

  const [habitInfos, habitInfosLoading] = useCollectionData<HabitInfo>(
    collection(db, "habits").withConverter(habitInfoConverter)
  );

  const [userHabitsData, setUserHabitsData] = useState<UserHabitData[]>([]);
  const [userHabitsDataLoading, setUserHabitsDataLoading] = useState(false);

  const loading = userLoading || habitInfosLoading || userHabitsDataLoading;

  useEffect(() => {
    if (!!userUid) {
      const ref = collection(db, `users/${userUid}/habitsData`).withConverter(
        userHabitDataConverter
      );

      return onSnapshot(ref, (snaps) => {
        setUserHabitsDataLoading(true);
        const userHabitsData: UserHabitData[] = [];
        snaps.forEach((snap) => {
          userHabitsData.push(snap.data());
        });
        setUserHabitsData(userHabitsData);
        setUserHabitsDataLoading(false);
      });
    }
  }, [userUid]);

  useEffect(() => {
    console.log(userHabitsData);
  }, [userHabitsData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {loading &&
        [1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            animation="wave"
            sx={{
              width: "14.6rem",
              height: "14.1rem",
              borderRadius: "0.5rem",
            }}
          />
        ))}
      {!loading &&
        habitInfos &&
        userHabitsData &&
        userHabits.slice(0, limit).map((habitId) => {
          const habitInfo = habitInfos.find(
            (i) => i.id == habitId
          ) as HabitInfo;
          const userHabitData: UserHabitData | undefined = userHabitsData.find(
            (i) => i.id === habitId
          );
          return (
            <HabitCard
              {...habitInfo}
              key={habitId}
              userHabitData={userHabitData}
            />
          );
        })}
    </Box>
  );
};
