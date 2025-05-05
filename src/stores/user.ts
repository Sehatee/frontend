import { User } from "@/types/User";
import { create } from "zustand";

export const useUserStore = create<{
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}>((set) => {
  return {
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
  };
});
