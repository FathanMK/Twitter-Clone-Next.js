import { Avatar } from "@nextui-org/react";
import Link from "next/link";

interface Props {
  username: string;
  displayName: string;
  profilePicture: string;
}

export default function Profile({
  username,
  displayName,
  profilePicture,
}: Props) {
  const routes = `/${username}`;
  return (
    <Link
      href={routes}
      className="flex items-center gap-4 p-4 cursor-pointer hover-default transition-default"
    >
      <Avatar aria-label="avatar" src={profilePicture} />
      <div className="flex flex-col">
        <p>{displayName}</p>
        <p className="text-xs text-gray-500">@{username}</p>
      </div>
    </Link>
  );
}
