import create from "zustand";

interface User {
  username: string;
  email: string;
  uid: string;
}

interface UserStore extends User {
  username: string;
  email: string;
  uid: string;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  email: "",
  uid: "",
  setUser: (user: User) => set(user),
}));
