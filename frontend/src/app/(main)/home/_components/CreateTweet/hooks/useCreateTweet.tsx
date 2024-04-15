import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TTweetSchema, TweetSchema } from "../schema/Tweet";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useCreateTweet(setFiles: any) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<TTweetSchema>({
    mode: "all",
    resolver: zodResolver(TweetSchema),
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

  const createTweetMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post("/tweet", data, {
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

      queryClient.invalidateQueries({ queryKey: ["tweets"] });
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

  const onSubmit: SubmitHandler<TTweetSchema> = (data) => {
    setIsLoading(true);
    const tweet = new FormData();
    tweet.append("content", data.tweet);
    for (let i = 0; i < data.images.length; i++) {
      tweet.append("images", data.images[i]);
    }
    createTweetMutation.mutate(tweet);
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
