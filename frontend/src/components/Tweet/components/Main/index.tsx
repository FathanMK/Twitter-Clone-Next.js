"use client";

import { Avatar } from "@nextui-org/react";
import Footer from "../Footer";
import Content from "../Content";
import User from "../User";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useContext, useRef } from "react";
import { TweetContext } from "../../providers";

export default function Main(props: HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const { id, username, isParent, profilePicture } = useContext(TweetContext);
  const routes = `/${username}/status/${id}`;
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={divRef}
      className={`flex gap-4 hover-default cursor-pointer relative p-4 ${
        props.className ? props.className : ""
      }`}
      onClick={() => router.push(routes)}
    >
      <Avatar src={profilePicture} aria-label="avatar" className="z-[2]" />
      {isParent && (
        <div className="w-[4px] h-full absolute left-[34px] z-[1]  bg-gray-500/35"></div>
      )}
      <div className="flex flex-col">
        <User />
        <Content />
        <Footer />
      </div>
    </div>
  );
}
