import { TweetContext } from "@/components/Tweet/providers";
import formatStatusCount from "@/libs/formatStatusCount";
import { useContext } from "react";

export default function Reply({ totalReplies }: { totalReplies: number }) {
  return (
    <button className="group flex items-center gap-1">
      <div className="w-8 h-8 group group-hover:bg-blue-500/20 transition-default rounded-full flex items-center justify-center">
        <img
          className="h-4 w-4 filter-gray transition-default group-hover:filter-blue"
          src="/icons/reply.png"
        />
      </div>
      <p className="text-sm text-gray-500 transition-default group-hover:text-blue-500">
        {formatStatusCount(totalReplies)}
      </p>
    </button>
  );
}
