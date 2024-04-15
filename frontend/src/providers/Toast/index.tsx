"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function Toast() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme === "light" ? "dark" : "light"}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
