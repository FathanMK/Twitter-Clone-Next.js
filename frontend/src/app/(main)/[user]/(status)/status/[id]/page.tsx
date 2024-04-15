"use client";

import CreateReply from "./_components/CreateReply";
import { useParams, useRouter } from "next/navigation";
import Reply from "./_components/Reply";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Tweet from "@/components/Tweet";
import { ITweet } from "@/interface/ITweet";
import Loading from "@/components/Loading";

export default function Status() {
  const router = useRouter();
  const { id } = useParams();
  const token = getCookie("token");
  const { data, isLoading } = useQuery({
    queryKey: ["tweet", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tweet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.tweet;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mx-4">
        <div className="py-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.back()}
              className="hover-default transition-default h-8 w-8 rounded-full flex items-center justify-center"
            >
              <img className="filter-white h-4 w-4" src="/icons/back.svg" />
            </button>
            <p className="text-xl font-black">Post</p>
          </div>
        </div>
        <Reply
          id={data.id}
          displayName={data.user.displayName}
          username={data.user.username}
          createdAt={data.createdAt}
          content={data.content ? data.content : ""}
          images={data.images ? data.images : []}
          totalReplies={data.replies.length}
          likes={data.likes}
          profilePicture={data.user.profilePicture}
        />
        <div className="py-4">
          <CreateReply tweetId={data.id} />
        </div>
      </div>
      <div className="border-t-[1px] border-rich-black/20 dark:border-ivory/20">
        {data.replies.map((item: ITweet) => (
          <Tweet
            mainProps={{
              className:
                "border-b-[1px] border-rich-black/20 dark:border-ivory/20",
            }}
            id={item.id}
            images={item.images}
            content={item.content}
            createdAt={item.createdAt}
            displayName={item.user.displayName}
            username={item.user.username}
            likes={item.likes}
            totalReplies={item.replies.length}
            profilePicture={item.user.profilePicture}
          />
        ))}
      </div>
    </div>
  );
}
