import { Timestamp } from "firebase/firestore";

// type HabitFrequency = "Everyday";

export interface HabitInfoDoc {
  iconUrl: string;
  color: string;
  name: string;
  description: string;
}

export interface HabitInfo extends HabitInfoDoc {
  id: string;
}

export interface UserHabitDataDoc {
  lastCheckedInDate: Timestamp;
  streak: number;
}

export interface UserHabitData {
  lastCheckedInDate: Date;
  streak: number;
  id: string;
}
