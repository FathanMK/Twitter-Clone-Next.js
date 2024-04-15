"use client";

import Follow from "@/components/Follow";
import Loading from "@/components/Loading";
import Unfollow from "@/components/Unfollow";
import { useAppSelector } from "@/interface/useAppSelector";
import axiosInstance from "@/libs/axiosInstance";
import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user: userRedux } = useAppSelector((state) => state.user);
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

      return { user: res.data.user.user, isUser: res.data.user.isUser };
    },
  });

  if (isLoading) return <Loading />;

  if (!data) throw new Error("User is not found!");

  const totalPosts = data.user.tweets.length;
  const formattedData = new Date(data?.user.createdAt).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const isFollowers = data.user.followers.some(
    (item: any) => item.id === userRedux.id
  );

  return (
    <div>
      <div className="px-4 py-2 sticky top-0 backdrop-blur-[100px] z-[10000]">
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push("/home")}
            className="hover-default transition-default h-8 w-8 rounded-full flex items-center justify-center"
          >
            <img
              className="filter-black dark:filter-white h-4 w-4"
              src="/icons/back.svg"
            />
          </button>
          <div>
            <p className="text-xl font-black">{data.user.displayName}</p>
            <p className="text-sm font-medium text-gray-500">
              {totalPosts <= 1 ? `${totalPosts} Post` : `${totalPosts} Posts`}
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img
          className="w-full h-60 object-cover"
          src={data.user.bannerPicture}
        />
        <div className="absolute bottom-[-74px] p-4">
          <Avatar
            src={data.user.profilePicture}
            className="h-32 w-32 border-[4px] border-ivory dark:border-rich-black"
          />
        </div>
      </div>
      <div>
        <div className="p-4 flex items-center justify-end">
          {data.isUser ? (
            <Button
              className="font-bold px-6 bg-rich-black text-ivory dark:bg-ivory dark:text-rich-black"
              radius="full"
            >
              Edit Profile
            </Button>
          ) : isFollowers ? (
            <Unfollow username={user as string} />
          ) : (
            <Follow username={user as string} />
          )}
        </div>
        <div className="px-4 pb-4">
          <p className="text-2xl font-bold">{data.user.displayName}</p>
          <p className="text-gray-500">@{data.user.username}</p>
        </div>
        <div className="px-4 pb-4">
          <p>{data.user.bio}</p>
        </div>
        <div className="px-4 pb-1 flex items-center gap-2">
          <img className="w-4 h-4 filter-gray" src="/icons/calendar.svg" />
          <p className="text-sm text-rich-black dark:text-ivory">Joined</p>
          <span className="text-rich-black dark:text-ivory font-bold">
            {formattedData}
          </span>
        </div>
        <div className="px-4 flex items-center gap-4">
          <p
            className="text-rich-black/80 dark:text-ivory/80  cursor-pointer hover:underline"
            onClick={() => router.push(`/${user}/following`)}
          >
            <span className="text-rich-black dark:text-ivory font-bold">
              {data.user.followings.length}
            </span>{" "}
            Following
          </p>
          <p
            className="text-rich-black/80 dark:text-ivory/80 cursor-pointer hover:underline"
            onClick={() => router.push(`/${user}/followers`)}
          >
            <span className="text-rich-black dark:text-ivory font-bold">
              {data.user.followers.length}
            </span>{" "}
            Followers
          </p>
        </div>
        {/* {!data.isUser && (
          <div className="flex items-center pt-4">
            <div className="flex items-center px-4">
              <Avatar className="w-8 h-8 border-[1px] border-white dark:border-black" />
              <Avatar className="w-8 h-8 border-[1px] border-white dark:border-black -ml-4" />
              <Avatar className="w-8 h-8 border-[1px] border-white dark:border-black -ml-4" />
            </div>
            <p className="text-sm">
              Followed by fathan, Fathan, Fathan and 5 more
            </p>
          </div>
        )} */}
      </div>
      <div className="mt-8 border-b-[1px] border-rich-black/20 dark:border-ivory/20">
        <Tabs
          fullWidth
          variant="underlined"
          selectedKey={pathname}
          classNames={{
            tab: "font-medium",
            tabContent: "group-data-[selected=true]:font-black",
          }}
        >
          <Tab key={`/${user}`} title="Posts" href={`/${user}`} />
          <Tab
            key={`/${user}/replies`}
            title="Replies"
            href={`/${user}/replies`}
          />
          <Tab key={`/${user}/likes`} title="Likes" href={`/${user}/likes`} />
        </Tabs>
      </div>
      <div>{children}</div>
    </div>
  );
}
