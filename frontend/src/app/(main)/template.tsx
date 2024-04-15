import ForYou from "@/components/ForYou";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container max-w-[1200px] overflow-hidden mx-auto grid grid-rows-[100vh] grid-cols-[260px_1fr_350px]">
      <Sidebar />
      <Timeline>{children}</Timeline>
      <ForYou />
    </main>
  );
}
