import { useContext } from "react";
import { TweetContext } from "../../providers";
import Images from "@/components/Images";
import formatDateTo12Hour from "@/libs/formatDateTo12Hour";

export default function Content() {
  const {
    id,
    content,
    images,
    displayName,
    username,
    createdAt,
    totalReplies,
    likes,
    profilePicture,
  } = useContext(TweetContext);

  const formatDateTo12HourStr = formatDateTo12Hour(createdAt);
  const formatDay = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-2">
      <p className="text-sm">{content}</p>
      <Images
        tweetId={id}
        content={content}
        images={images}
        displayName={displayName}
        username={username}
        formatDateTo12HourStr={formatDateTo12HourStr}
        formatDay={formatDay}
        totalReplies={totalReplies}
        likes={likes}
        profilePicture={profilePicture}
      />
    </div>
  );
}
