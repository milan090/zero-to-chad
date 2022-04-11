import { DocumentData } from "firebase/firestore";

export interface UserDoc extends DocumentData {
  username: string;
}
