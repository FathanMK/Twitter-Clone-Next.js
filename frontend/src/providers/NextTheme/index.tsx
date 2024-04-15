"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function NextTheme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
