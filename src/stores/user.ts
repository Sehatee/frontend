import { User } from "@/types/User";
import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const useUserStore = create<{
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
}>((set) => {
  return {
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
    fetchUser: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        set({ user: res.data.user });
      } catch {
        set({
          user: null,
        });
      }
    },
  };
});
