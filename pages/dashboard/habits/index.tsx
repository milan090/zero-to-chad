import { Box, Skeleton, Typography } from "@mui/material";
import { db } from "config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { HabitCard } from "src/client/components/HabitCard.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";
import {
  habitInfoConverter,
  userHabitDataConverter,
} from "src/services/habits.service";
import { HabitInfo, UserHabitData } from "src/types/habit.types";

const HabitsPage: NextPage = () => {
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
    <SideBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="600">
          My Habits
        </Typography>
        <Link passHref href="/dashboard/habits/manage">
          <Typography
            color="#2F80ED"
            fontWeight="600"
            sx={{ cursor: "pointer" }}
          >
            Manage
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "1rem",
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
          userHabits.map((habitId) => {
            const habitInfo = habitInfos.find(
              (i) => i.id == habitId
            ) as HabitInfo;
            const userHabitData: UserHabitData | undefined =
              userHabitsData.find((i) => i.id === habitId);
            return (
              <HabitCard
                {...habitInfo}
                key={habitId}
                userHabitData={userHabitData}
              />
            );
          })}
      </Box>
    </SideBar>
  );
};

export default HabitsPage;
