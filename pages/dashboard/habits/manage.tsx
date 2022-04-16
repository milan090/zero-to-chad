import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { SideBar } from "src/client/layouts/SideBar.layout";
import SaveIcon from "public/images/dashboard/bx_save.svg";
import { HabitInfo } from "src/types/habit.types";
import { HabitManageCard } from "src/client/components/HabitManageCard.component";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "config/firebase.config";
import { habitInfoConverter } from "src/services/habits.service";
import { useUserStore } from "src/client/store/user.store";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const ManageHabitsPage: NextPage = () => {
  const router = useRouter();
  const [userUid, userHabits] = useUserStore((state) => [
    state.uid,
    state.habits,
  ]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [habits, loading] = useCollectionData<HabitInfo>(
    collection(db, "habits").withConverter(habitInfoConverter)
  );
  const [saving, setSaving] = useState(false);

  const setCardSelected = (habitId: string, value: boolean) => {
    if (value) {
      setSelectedHabits([...selectedHabits, habitId]);
    } else {
      setSelectedHabits(
        selectedHabits.filter((selectedHabitId) => selectedHabitId !== habitId)
      );
    }
  };

  const handleSave = () => {
    const userDocRef = doc(db, "users", userUid);
    setSaving(true);
    updateDoc(userDocRef, {
      habits: selectedHabits,
    })
      .then(() => {
        toast.success("Successsfully saved changes!");
        router.push("/dashboard/habits");
      })
      .catch((err) => console.log(err))
      .finally(() => setSaving(false));
  };

  useEffect(() => {
    setSelectedHabits(userHabits);
  }, [userHabits, userUid]);

  const appBarChildren = (
    <Breadcrumbs aria-label="breadcrumb">
      <NextLink href="/dashboard/habits" passHref>
        <Link underline="hover" color="inherit">
          Habits
        </Link>
      </NextLink>

      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 1300,
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="600">
            Manage Habits
          </Typography>
          <Button
            variant="contained"
            startIcon={
              saving ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                <SaveIcon />
              )
            }
            color="info"
            sx={{ borderRadius: "0.5rem", width: 155 }}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: 3,
            backgroundColor: "white",
            padding: "2rem",
            margin: "auto",
            marginTop: "1.5rem",
            borderRadius: "1rem",
            width: "100%",
            minHeight: "50vh",
            alignContent: "flex-start",
          }}
        >
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
                  handleClick={() => setCardSelected(id, !checked)}
                  variant="background"
                />
              );
            })}
        </Box>
      </Box>
    </SideBar>
  );
};

export default ManageHabitsPage;
