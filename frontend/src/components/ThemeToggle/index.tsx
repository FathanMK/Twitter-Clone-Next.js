"use client";

import { Classic } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isMounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }

    setTheme("dark");
  };
  return (
    //@ts-ignore
    <Classic
      className="text-3xl"
      toggled={theme !== "dark"}
      onToggle={handleToggle}
    />
  );
}
