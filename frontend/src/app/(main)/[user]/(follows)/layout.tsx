"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import FollowsProvider from "./_providers";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Loading from "@/components/Loading";

export default function UserFollowsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useParams();
  const token = getCookie("token");

  const { data, isLoading } = useQuery({
    queryKey: ["user", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { user: res.data.user.user };
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="px-4 py-2 sticky top-0 backdrop-blur-[100px] z-[10000]">
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push(`/${user}`)}
            className="hover-default transition-default h-8 w-8 rounded-full flex items-center justify-center"
          >
            <img
              className="filter-black dark:filter-white h-4 w-4"
              src="/icons/back.svg"
            />
          </button>
          <div>
            <p className="text-xl font-black">{data?.user.displayName}</p>
            <p className="text-sm font-medium text-gray-500">
              {data?.user.username}
            </p>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-rich-black/20 dark:border-ivory/20">
        <Tabs fullWidth variant="underlined" selectedKey={pathname}>
          <Tab
            key={`/${user}/following`}
            title="Following"
            href={`/${user}/following`}
          />
          <Tab
            key={`/${user}/followers`}
            title="Followers"
            href={`/${user}/followers`}
          />
        </Tabs>
      </div>
      <div>
        <FollowsProvider>{children}</FollowsProvider>
      </div>
    </div>
  );
}
