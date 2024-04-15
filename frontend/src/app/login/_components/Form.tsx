"use client";

import { Button, Input, Link } from "@nextui-org/react";
import useLogin from "../_hooks/useLogin";
import PasswordInput from "@/components/PasswordInput";

export default function Login() {
  const { isLoading, register, errors, handleSubmit, onSubmit } = useLogin();
  return (
    <form
      className="flex flex-col h-full items-center justify-center mx-auto w-2/3 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("username")}
        isInvalid={Boolean(errors.username)}
        errorMessage={errors.username?.message}
        label="Username"
        labelPlacement="inside"
      />
      <PasswordInput
        register={register("password")}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        label="Password"
      />
      <Button
        isDisabled={isLoading}
        type="submit"
        color="primary"
        className="mt-4 mx-auto w-40"
      >
        Login
      </Button>
      <Link href="/register" className="-mt-2">
        Didn't have an account?
      </Link>
    </form>
  );
}
