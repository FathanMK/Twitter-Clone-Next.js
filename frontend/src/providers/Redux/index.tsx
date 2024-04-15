"use client";

import store from "@/features/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function Redux({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
