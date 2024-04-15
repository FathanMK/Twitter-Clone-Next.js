import Follow from "@/components/Follow";
import Unfollow from "@/components/Unfollow";
import { Avatar, Button } from "@nextui-org/react";

interface Props {
  displayName: string;
  username: string;
  isFollowing: boolean;
  isUser: boolean;
  profilePicture: string;
}

export default function User({
  displayName,
  username,
  isFollowing,
  isUser,
  profilePicture,
}: Props) {
  return (
    <div className="flex gap-4 hover-default cursor-pointer p-4">
      <Avatar src={profilePicture} />
      <div className="flex flex-1 justify-between items-center">
        <div>
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-sm text-gray-500">@{username}</p>
          <p className="text-sm w-[200px] truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
            tempore.
          </p>
        </div>
        {isUser ? (
          <Button
            size="sm"
            className="font-bold px-4 h-[30px] bg-white text-black"
            radius="full"
          >
            Profile
          </Button>
        ) : isFollowing ? (
          <Unfollow username={username} />
        ) : (
          <Follow username={username} />
        )}
      </div>
    </div>
  );
}
