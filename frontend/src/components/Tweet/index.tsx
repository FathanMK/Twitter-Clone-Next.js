"use client";

import Main from "./components/Main";
import TweetProvider from "./providers";
import { Props } from "./interface/Props";
import { HTMLAttributes } from "react";

interface extendsProps extends Props {
  mainProps?: HTMLAttributes<HTMLDivElement>;
}

export default function Tweet({ mainProps, ...props }: extendsProps) {
  return (
    <TweetProvider {...props}>
      <Main {...mainProps} />
    </TweetProvider>
  );
}
