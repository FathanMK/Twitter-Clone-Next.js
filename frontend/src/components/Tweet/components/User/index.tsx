"use client";

import { MouseEvent, useContext } from "react";
import { TweetContext } from "../../providers";
import formatDuration from "@/libs/formatDuration";
import { useRouter } from "next/navigation";

export default function User() {
  const { username, displayName, createdAt } = useContext(TweetContext);
  const formatDurationStr = formatDuration(createdAt);
  const router = useRouter();

  const handleLink = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/${username}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2" onClick={handleLink}>
        <p className="font-semibold max-w-[300px] hover:underline decoration-[1.5px] truncate">
          {displayName}
        </p>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>
      <p className="text-sm text-gray-500">·</p>
      <p className="text-sm text-gray-500">{formatDurationStr}</p>
    </div>
  );
}
