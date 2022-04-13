type HabitFrequency = "Everyday";

export interface Habit {
  iconUrl: string;
  color: string;
  name: string;
  frequency: HabitFrequency;
  streak: number;
  uid: string;
}
