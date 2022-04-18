import { Box, Typography, Skeleton } from "@mui/material";
import { db } from "config/firebase.config";
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { NextPage } from "next";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CircularProgressWithContent } from "src/client/components/CircularProgressWithContent.component";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { useUserStore } from "src/client/store/user.store";
import { UserHabitDataDoc } from "src/types/habit.types";
import StarsIcon from "@mui/icons-material/Stars";

const AchievementsPage: NextPage = () => {
  const [userUid] = useUserStore((state) => [state.uid]);
  return (
    <SideBar>
      <Box
        sx={{
          margin: "auto",
          maxWidth: 1300,
          paddingX: "2rem",
          boxSizing: "content-box",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {userUid && <AchievementsList userUid={userUid} />}
      </Box>
    </SideBar>
  );
};

const AchievementsList: React.FC<{ userUid: string }> = ({ userUid }) => {
  const [habitsData, habitsDataLoading] = useCollectionData<UserHabitDataDoc>(
    query<UserHabitDataDoc>(
      collection(
        db,
        "users",
        userUid,
        "habitsData"
      ) as CollectionReference<UserHabitDataDoc>,
      orderBy("streak", "desc"),
      limit(1)
    )
  );

  if (habitsDataLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={150} width="70%" />
      </Box>
    );
  }

  return (
    <Box>
      <AchievementCard
        currentValue={habitsData ? habitsData[0].streak : 0}
        goal={60}
        name="Habit Master"
        description="Complete 60 day streak of your habit"
      />
    </Box>
  );
};

type Props = {
  currentValue: number;
  goal: number;
  name: string;
  description: string;
};

const AchievementCard: React.FC<Props> = ({
  currentValue,
  goal,
  name,
  description,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "1rem",
        display: "flex",
        background: "white",
        width: "100%",
        maxWidth: 600,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          background: "#FDD47A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: "2rem",
        }}
      >
        <CircularProgressWithContent value={(currentValue / goal) * 100}>
          <StarsIcon sx={{ width: 32, height: 32 }} />
        </CircularProgressWithContent>
        {currentValue}/{goal}
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h6" fontWeight="500">
          {name}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};

export default AchievementsPage;
