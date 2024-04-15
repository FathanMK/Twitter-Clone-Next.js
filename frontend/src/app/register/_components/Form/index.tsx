"use client";

import PasswordInput from "@/components/PasswordInput";
import useRegister from "../../_hooks/useRegister";
import { Input, Button, Link } from "@nextui-org/react";
import ProfilePictureInput from "../ProfilePictureInput";
import BannerPictureInput from "../BannerPictureInput";

export default function Form() {
  const { isLoading, register, setValue, errors, handleSubmit, onSubmit } =
    useRegister();
  return (
    <form
      className="flex flex-col items-center justify-center mx-auto w-2/3 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("displayName")}
        isInvalid={Boolean(errors.displayName)}
        errorMessage={errors.displayName?.message}
        label="Display Name"
        labelPlacement="inside"
      />
      <Input
        {...register("username")}
        isInvalid={Boolean(errors.username)}
        errorMessage={errors.username?.message}
        label="Username"
        labelPlacement="inside"
      />
      <Input
        {...register("email")}
        isInvalid={Boolean(errors.email)}
        errorMessage={errors.email?.message}
        type="email"
        label="Email"
        labelPlacement="inside"
      />
      <ProfilePictureInput errors={errors} setValue={setValue} />
      <BannerPictureInput errors={errors} setValue={setValue} />
      <PasswordInput
        register={register("password")}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        label="Password"
      />
      <PasswordInput
        register={register("confirmPassword")}
        isInvalid={Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword?.message}
        label="Confirm Password"
      />
      <Button
        isDisabled={isLoading}
        type="submit"
        color="primary"
        className="mt-4 mx-auto w-40"
      >
        Register
      </Button>
      <Link href="/login" className="-mt-2">
        Have an account?
      </Link>
    </form>
  );
}
