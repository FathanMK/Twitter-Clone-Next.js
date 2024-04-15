"use client";

import Loading from "@/components/Loading";
import { useContext } from "react";
import { FollowsContext } from "../_providers";
import User from "../_components/User";
import { useAppSelector } from "@/interface/useAppSelector";

export default function UserFollowers() {
  const { followers, followings, isFollowersLoading, isFollowingsLoading } =
    useContext(FollowsContext);
  const { user } = useAppSelector((state) => state.user);

  if (isFollowersLoading && isFollowingsLoading) return <Loading />;

  return (
    <div>
      {followers.map((item: any) => {
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
