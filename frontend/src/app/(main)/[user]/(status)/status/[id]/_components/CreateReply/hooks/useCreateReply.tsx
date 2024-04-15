import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TReplySchema, ReplySchema } from "../schema/Reply";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useCreateReply(setFiles: any, tweetId: string) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<TReplySchema>({
    mode: "all",
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      tweet: "",
      images: [],
    },
  });

  const tweet = watch("tweet");
  const images = watch("images");
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("token");
  const queryClient = useQueryClient();

  const createReplyMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post(`/reply/${tweetId}`, data, {
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

      queryClient.invalidateQueries({ queryKey: ["tweet", tweetId] });
      setIsLoading(false);
      setFiles([]);
      setValue("tweet", "");
      setValue("images", []);
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        className: "toast-error",
      });

      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<TReplySchema> = (data) => {
    setIsLoading(true);
    const tweet = new FormData();
    tweet.append("content", data.tweet);
    for (let i = 0; i < data.images.length; i++) {
      tweet.append("images", data.images[i]);
    }

    createReplyMutation.mutate(tweet);
  };

  return {
    tweet,
    images,
    register,
    errors,
    isLoading,
    setValue,
    handleSubmit,
    onSubmit,
  };
}
