import { ReactNode } from "react";

export default function Timeline({ children }: { children: ReactNode }) {
  return <div className="overflow-scroll">{children}</div>;
}
