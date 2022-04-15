import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import {
  HabitInfoDoc,
  HabitInfo,
  UserHabitData,
  UserHabitDataDoc,
} from "src/types/habit.types";

export const habitInfoConverter: FirestoreDataConverter<HabitInfo> = {
  toFirestore(habitInfo: HabitInfo): HabitInfoDoc {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...habitInfoDoc } = habitInfo;
    return habitInfoDoc;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<HabitInfoDoc>,
    options: SnapshotOptions
  ): HabitInfo {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
};

export const userHabitDataConverter: FirestoreDataConverter<UserHabitData> = {
  toFirestore({ streak, lastCheckedInDate }: UserHabitData): UserHabitDataDoc {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      streak,
      lastCheckedInDate: Timestamp.fromDate(lastCheckedInDate),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<UserHabitDataDoc>,
    options: SnapshotOptions
  ): UserHabitData {
    const { streak, lastCheckedInDate } = snapshot.data(options);
    return {
      lastCheckedInDate: lastCheckedInDate.toDate(),
      streak,
      id: snapshot.id,
    };
  },
};
