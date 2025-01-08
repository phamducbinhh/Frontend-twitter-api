/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalState {
  isLoggedIn: boolean;
  onlineUsers: number[];
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setOnlineUsers: (onlineUsers: number[]) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,
      onlineUsers: [],
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setOnlineUsers: (onlineUsers: number[]) => set({ onlineUsers }),
    }),
    { name: "GlobalStore" }
  )
);
