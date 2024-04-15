import Status from "@/components/Status";
import { useContext } from "react";
import { TweetContext } from "../../providers";

export default function Footer() {
  const { totalReplies, likes, id } = useContext(TweetContext);
  return (
    <div className="flex gap-10">
      <Status tweetId={id} totalReplies={totalReplies} likes={likes} />
    </div>
  );
}
