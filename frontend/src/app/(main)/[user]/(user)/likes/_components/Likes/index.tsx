"use client";

import Loading from "@/components/Loading";
import Tweet from "@/components/Tweet";
import { ITweet } from "@/interface/ITweet";
import axiosInstance from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";

export default function Likes() {
  const token = getCookie("token");
  const { user } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["likes", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/${user}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.likes;
    },
  });

  if (isLoading) return <Loading />;

  return data.map((item: ITweet) => (
    <Tweet
      mainProps={{
        className: "border-b-[1px] border-rich-black/20 dark:border-ivory/20",
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
  ));
}
