"use client";

import { Button } from "@nextui-org/react";
import ThemeToggle from "../ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/interface/useAppSelector";

export default function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const handleLogout = () => {
    setIsLoading(true);
    deleteCookie("token");
    localStorage.removeItem("token");
    toast.success("User is logged out!", {
      className: "toast-success",
    });
    setTimeout(() => {
      router.push("/login");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col p-4 gap-4 border-r-[1px] border-rich-black/20 dark:border-ivory/20">
      <div className="h-12 w-12 p-3 flex items-center justify-center rounded-full transition-default hover-default">
        <ThemeToggle />
      </div>
      <nav className="flex flex-col gap-4">
        <a
          className="flex items-center gap-4 h-14 p-3 cursor-pointer rounded-md transition-default hover-default"
          onClick={() => router.push("/home")}
        >
          <img
            className="h-6 w-6 dark:filter-white"
            src={`${
              path.startsWith("/home")
                ? "/icons/home-alt.svg"
                : "/icons/home.svg"
            }`}
          />
          <p
            className={`${
              path.startsWith("/home") ? "font-black" : "font-medium"
            } text-lg tracking-wider`}
          >
            Home
          </p>
        </a>
        <a
          className="flex items-center gap-4 h-14 p-3 cursor-pointer rounded-md transition-default hover-default"
          onClick={() => router.push(`/${user.username}`)}
        >
          <img
            className="h-6 w-6 dark:filter-white"
            src={`${
              path.startsWith(`/${user.username}`)
                ? "/icons/user-alt.svg"
                : "/icons/user.svg"
            }`}
          />
          <p
            className={`${
              path.startsWith(`/${user.username}`)
                ? "font-black"
                : "font-medium"
            } text-lg tracking-wider`}
          >
            Profile
          </p>
        </a>
      </nav>
      <Button
        isDisabled={isLoading}
        radius="full"
        className="bg-red-500 text-ivory font-bold mt-auto"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
