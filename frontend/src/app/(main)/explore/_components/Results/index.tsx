"use client";

import Loading from "@/components/Loading";
import Tweet from "@/components/Tweet";
import axiosInstance from "@/libs/axiosInstance";
import { Avatar } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = getCookie("token");
  const query = searchParams.get("query");
  const querySanitize = query?.replace("+", " ");

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", querySanitize],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user?u=${querySanitize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.users;
    },
  });

  const { data: contents, isLoading: isLoadingContents } = useQuery({
    queryKey: ["search", querySanitize],
    queryFn: async () => {
      const res = await axiosInstance.get(`/search?q=${querySanitize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.results;
    },
  });

  if (isLoadingUsers || isLoadingContents) return <Loading />;

  return (
    <>
      <div className="p-4 sticky top-0 backdrop-blur-[100px] z-[10000]">
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
          <p className="text-xl font-black">Results for "{querySanitize}"</p>
        </div>
      </div>
      {users.length !== 0 ? (
        <div className="border-b-[1px] border-rich-black/20 dark:border-ivory/20">
          <p className="font-black p-4 text-xl">People</p>
          {users.map((item: any) => (
            <div className="flex gap-4 hover-default cursor-pointer p-4">
              <Avatar src={item.profilePicture} />
              <div className="flex flex-1 justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{item.displayName}</p>
                  <p className="text-sm text-gray-500">@{item.username}</p>
                  <p className="text-sm w-[200px] truncate">{item.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {contents.length !== 0 ? (
        <div className="border-b-[1px] border-rich-black/20 dark:border-ivory/20">
          <p className="font-black p-4 text-xl">Tweets</p>
          {contents.map((item: any) => (
            <Tweet
              mainProps={{
                className:
                  "border-b-[1px] border-rich-black/20 dark:border-ivory/20",
              }}
              key={item.id}
              id={item.id}
              images={item.images}
              createdAt={item.createdAt}
              content={item.content}
              displayName={item.user.displayName}
              username={item.user.username}
              likes={item.likes}
              totalReplies={item.replies.length}
              profilePicture={item.user.profilePicture}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
