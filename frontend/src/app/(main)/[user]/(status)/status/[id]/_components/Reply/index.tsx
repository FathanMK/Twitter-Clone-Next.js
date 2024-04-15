import formatDateTo12Hour from "@/libs/formatDateTo12Hour";
import Images from "@/components/Images";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import Status from "@/components/Status";

interface Props {
  id: string;
  displayName: string;
  username: string;
  createdAt: string;
  content: string;
  images: string[];
  totalReplies: number;
  likes: any[];
  profilePicture: string;
}

export default function Reply({
  id,
  displayName,
  username,
  createdAt,
  content,
  images,
  totalReplies,
  likes,
  profilePicture,
}: Props) {
  const formatDateTo12HourStr = formatDateTo12Hour(createdAt);
  const formatDay = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Avatar src={profilePicture} />
        <Link className="flex flex-col" href={`/${username}`}>
          <p className="font-semibold max-w-[300px] hover:underline decoration-[1.5px] truncate">
            {displayName}
          </p>
          <p className="text-sm text-gray-500">@{username}</p>
        </Link>
      </div>
      <div className="pt-2">
        <p className="text-lg tracking-wider">{content}</p>
        <Images
          tweetId={id}
          totalReplies={totalReplies}
          likes={likes}
          images={images}
          displayName={displayName}
          username={username}
          content={content}
          formatDateTo12HourStr={formatDateTo12HourStr}
          formatDay={formatDay}
          profilePicture={profilePicture}
        />
      </div>
      <div className="py-4 flex items-center gap-1 border-b-[1px] border-rich-black/20 dark:border-ivory/20">
        <p className="text-sm text-gray-500">{formatDateTo12HourStr}</p>
        <p className="text-sm text-gray-500">·</p>
        <p className="text-sm text-gray-500">{formatDay}</p>
      </div>
      <div className="flex items-center gap-20 border-b-[1px] py-2 border-rich-black/20 dark:border-ivory/20">
        <Status tweetId={id} totalReplies={totalReplies} likes={likes} />
      </div>
    </div>
  );
}
