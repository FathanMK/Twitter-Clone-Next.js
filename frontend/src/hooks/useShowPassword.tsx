import { useState, MouseEvent } from "react";

export default function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    handleShowPassword,
  };
}
