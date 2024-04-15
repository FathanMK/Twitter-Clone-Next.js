"use client";

import Loading from "@/components/Loading";
import Tweet from "@/components/Tweet";
import { ITweet } from "@/interface/ITweet";
import axiosInstance from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";

export default function Replies() {
  const token = getCookie("token");
  const { user } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["replies", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/replies/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.replies);

      return res.data.replies;
    },
  });

  if (isLoading) return <Loading />;

  return data.map((item: ITweet) => {
    const reply: any = item.replies.find((item) => item.user.username === user);

    return (
      <div
        key={item.id}
        className="border-b-[1px] border-rich-black/20 dark:border-ivory/20"
      >
        <Tweet
          isParent
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
        <Tweet
          key={reply.id}
          id={reply.id}
          images={reply.images}
          createdAt={reply.createdAt}
          content={reply.content}
          displayName={reply.user.displayName}
          username={reply.user.username}
          likes={reply.likes}
          totalReplies={reply.replies.length}
          profilePicture={reply.user.profilePicture}
        />
      </div>
    );
  });
}
