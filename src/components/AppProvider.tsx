"use client";
import SettingsProvider from "@/components/SettingsProvider";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import { Toaster } from "./ui/toaster";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </SettingsProvider>
  );
}
