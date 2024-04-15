import useShowPassword from "@/hooks/useShowPassword";
import { Input } from "@nextui-org/react";

export default function PasswordInput({
  label,
  register,
  isInvalid,
  errorMessage,
}: {
  label: string;
  register: any;
  isInvalid: any;
  errorMessage: any;
}) {
  const { showPassword, handleShowPassword } = useShowPassword();
  return (
    <Input
      {...register}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      type={showPassword ? "text" : "password"}
      label={label}
      labelPlacement="inside"
      endContent={
        <button
          className=" flex items-center justify-center"
          onClick={handleShowPassword}
        >
          <img
            className="w-6 h-6 filter-black dark:filter-white"
            src={showPassword ? "/icons/show.svg" : "/icons/hide.svg"}
          />
        </button>
      }
    />
  );
}
