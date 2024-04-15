"use client";

import axiosInstance from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { createContext, ReactNode } from "react";

interface IFollowsContext {
  followers: any[];
  isFollowersLoading: boolean;
  followings: any[];
  isFollowingsLoading: boolean;
}

export const FollowsContext = createContext({} as IFollowsContext);

export default function FollowsProvider({ children }: { children: ReactNode }) {
  const { user } = useParams();
  const token = getCookie("token");
  const { data: followers, isLoading: isFollowersLoading } = useQuery({
    queryKey: ["followers", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/${user}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.followers;
    },
  });
  const { data: followings, isLoading: isFollowingsLoading } = useQuery({
    queryKey: ["followings", user],
    queryFn: async () => {
      const res = await axiosInstance.get(`/${user}/followings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.followings;
    },
  });
  return (
    <FollowsContext.Provider
      value={{ followers, followings, isFollowersLoading, isFollowingsLoading }}
    >
      {children}
    </FollowsContext.Provider>
  );
}
