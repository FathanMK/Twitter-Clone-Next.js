import { Metadata } from "next";
import HomeComponent from "./_components/HomeComponent";

export const metadata: Metadata = {
  title: "zer0",
  description: "Home page for zer0",
};

export default function Home() {
  return <HomeComponent />;
}
