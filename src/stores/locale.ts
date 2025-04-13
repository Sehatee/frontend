import { create } from "zustand";

export const useLocaleStore = create<{
  locale: string;
  setLocale: (locale: string) => void;
}>((set) => ({
  locale: "en",
  setLocale: (newLocale: string) => {
    set({ locale: newLocale });
  },
}));
