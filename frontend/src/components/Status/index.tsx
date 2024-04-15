import Likes from "./components/Likes";
import Reply from "./components/Reply";

export default function Status({
  tweetId,
  totalReplies,
  likes,
}: {
  tweetId: string;
  totalReplies: number;
  likes: any[];
}) {
  return (
    <>
      <Reply totalReplies={totalReplies} />
      <Likes likes={likes} tweetId={tweetId} />
    </>
  );
}
