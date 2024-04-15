"use client";

import { Avatar } from "@nextui-org/react";
import Search from "./components/Search";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Loading from "../Loading";
import Link from "next/link";

export default function ForYou() {
  const token = getCookie("token");
  const { data, isLoading } = useQuery({
    queryKey: ["rec-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.users;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 flex flex-col gap-4 border-l-[1px] border-rich-black/20 dark:border-ivory/20">
      <Search />
      <div className="rounded-lg">
        <p className="p-4 font-black">You might know</p>
        <div>
          {data.map((item: any) => (
            <Link
              href={`/${item.username}`}
              className="p-4 flex gap-4 cursor-pointer hover-default"
            >
              <Avatar src={item.profilePicture} />
              <div>
                <p className="text-sm">{item.displayName}</p>
                <p className="text-xs text-gray-500">@{item.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
