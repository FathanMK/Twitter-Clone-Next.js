"use client";

import CreateTweetProvider from "./providers";
import Input from "./components/Input";

export default function CreateTweet() {
  return (
    <CreateTweetProvider>
      <Input />
    </CreateTweetProvider>
  );
}
