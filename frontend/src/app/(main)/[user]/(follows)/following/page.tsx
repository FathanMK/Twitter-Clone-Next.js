"use client";

import Loading from "@/components/Loading";
import { useContext } from "react";
import { FollowsContext } from "../_providers";
import User from "../_components/User";
import { useAppSelector } from "@/interface/useAppSelector";

export default function UserFollowing() {
  const { followings, isFollowingsLoading } = useContext(FollowsContext);
  const { user } = useAppSelector((state) => state.user);

  if (isFollowingsLoading) return <Loading />;

  return (
    <div>
      {followings.map((item: any) => {
        const isFollowing = followings.some(
          (follow: any) => follow.id === item.id
        );
        const isUser = item.id === user.id;
        return (
          <User
            key={item.id}
            {...item}
            isFollowing={isFollowing}
            isUser={isUser}
          />
        );
      })}
    </div>
  );
}
