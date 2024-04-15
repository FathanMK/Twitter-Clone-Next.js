"use client";

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import CreateTweet from "../CreateTweet";
import { ITweet } from "@/interface/ITweet";
import Tweet from "@/components/Tweet";
import axiosInstance from "@/libs/axiosInstance";
import Loading from "@/components/Loading";

export default function HomeComponent() {
  const token = getCookie("token");
  const { data, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.tweets;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <CreateTweet />
      {data.map((item: ITweet) => (
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
    </>
  );
}
