import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="3px"
        color="#1C64F2"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {/* <ReactQueryDevtools initialIsOpen={false} position={"left"} /> */}
    </QueryClientProvider>
  );
}
