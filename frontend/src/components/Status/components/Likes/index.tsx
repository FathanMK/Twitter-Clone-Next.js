import { useAppSelector } from "@/interface/useAppSelector";
import axiosInstance from "@/libs/axiosInstance";
import formatStatusCount from "@/libs/formatStatusCount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { MouseEvent } from "react";
import { toast } from "sonner";

export default function Likes({
  likes,
  tweetId,
}: {
  likes: any[];
  tweetId: string;
}) {
  const token = getCookie("token");
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  const isLiked = likes.some((item) => item.id === user.id);

  const createLikeMutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post(
        `/like/${tweetId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess(response) {
      const data = response.data;
      toast.success(data.message, {
        className: "toast-success",
      });
      queryClient.invalidateQueries();
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(`/like/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess(response) {
      const data = response.data;
      toast.success(data.message, {
        className: "toast-success",
      });
      queryClient.invalidateQueries();
    },
  });

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLiked) {
      deleteLikeMutation.mutate();
    } else {
      createLikeMutation.mutate();
    }
  };

  return (
    <button className="group flex items-center gap-1" onClick={handleLike}>
      <div className="w-8 h-8 group group-hover:bg-pink-500/20 transition-default rounded-full flex items-center justify-center">
        <img
          className={`w-4 h-4 ${
            isLiked ? "filter-pink" : "filter-gray"
          } transition-default group-hover:filter-pink`}
          src={isLiked ? "/icons/heart-alt.svg" : "/icons/heart.svg"}
        />
      </div>
      <p
        className={`text-sm ${
          isLiked ? "text-pink-500" : "text-gray-500"
        } transition-default group-hover:text-pink-500`}
      >
        {formatStatusCount(likes.length)}
      </p>
    </button>
  );
}
