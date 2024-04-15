"use client";

import CreateReplyProvider from "./providers";
import Input from "./components/Input";

export default function CreateReply({ tweetId }: { tweetId: string }) {
  return (
    <CreateReplyProvider tweetId={tweetId}>
      <Input />
    </CreateReplyProvider>
  );
}
