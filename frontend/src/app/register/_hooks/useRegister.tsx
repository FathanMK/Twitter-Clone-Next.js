import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "@/libs/axiosInstance";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema, TRegisterSchema } from "../_schema/Register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<TRegisterSchema>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post("/user/register", data);
    },
    onSuccess(response) {
      toast.success(response.data.message, {
        className: "toast-success",
      });
      router.push("/login");
      setIsLoading(false);
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        className: "toast-error",
      });
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    // setIsLoading(true);
    const user = new FormData();
    const profilePicExtension = data.profilePicture.type.split("/")[1];
    const bannerPicExtension = data.bannerPicture.type.split("/")[1];

    user.append("displayName", data.displayName);
    user.append("username", data.username);
    user.append("email", data.email);
    user.append("password", data.password);
    user.append(
      "images",
      data.profilePicture,
      `profilePic.${profilePicExtension}`
    );
    user.append(
      "images",
      data.bannerPicture,
      `bannerPic.${bannerPicExtension}`
    );

    registerMutation.mutate(user);
  };

  return { isLoading, register, errors, setValue, handleSubmit, onSubmit };
}
