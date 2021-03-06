import { UserDoc } from "src/types/User.types";
import create from "zustand";

interface User extends UserDoc {
  email: string;
  uid: string;
  username: string;
  habits: string[];
  hasCompletedOnBoarding: boolean;
  topics: string[];
  lastReadCollectionId: string;
}

interface UserStore extends User {
  setUser: (user: Partial<User>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  email: "",
  uid: "",
  lastReadCollectionId: "",
  setUser: (newUser: Partial<User>) =>
    set((state) => {
      const {
        username,
        email,
        uid,
        habits,
        hasCompletedOnBoarding,
        topics,
        lastReadCollectionId,
      } = state;

      return Object.assign(
        {
          username,
          email,
          uid,
          habits,
          hasCompletedOnBoarding,
          topics,
          lastReadCollectionId,
        },
        newUser
      );
    }),
  habits: [],
  hasCompletedOnBoarding: false,
  topics: [],
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
}));
