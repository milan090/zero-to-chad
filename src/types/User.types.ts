import { DocumentData } from "firebase/firestore";

export interface UserDoc extends DocumentData {
  username: string;
  habits?: string[];
  hasCompletedOnBoarding?: boolean;
  /** Topics that user is interested in */
  topics?: string[];
}
