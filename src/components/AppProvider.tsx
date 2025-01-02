"use client";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}
