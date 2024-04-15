import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "@/libs/axiosInstance";
import { SubmitHandler, useForm } from "react-hook-form";
import { TLoginSchema, LoginSchema } from "../_schema/Login";
import { toast } from "sonner";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/interface/useAppDispatch";
import { addUser } from "@/features/slices/user";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginSchema>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: TLoginSchema) => {
      return axiosInstance.post("/user/login", data);
    },
    onSuccess(response) {
      const data = response.data;
      toast.success(data.message, {
        className: "toast-success",
      });
      dispatch(
        addUser({
          id: data.id,
          username: data.username,
          profilePicture: data.profilePicture,
        })
      );
      setCookie("token", data.token);
      setIsLoading(false);
      router.push("/home");
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        className: "toast-error",
      });
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    setIsLoading(true);
    const user = {
      username: data.username,
      password: data.password,
    };

    loginMutation.mutate(user);
  };

  return { isLoading, register, errors, handleSubmit, onSubmit };
}
