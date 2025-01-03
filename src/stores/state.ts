import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalState {
  isLoggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,

      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    { name: "GlobalStore" }
  )
);
