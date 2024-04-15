import axiosInstance from "@/libs/axiosInstance";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

export default function Follow({ username }: { username: string }) {
  const token = getCookie("token");
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post(
        `/user/follow/${username}`,
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

      queryClient.invalidateQueries();
      toast.success(data.message, {
        className: "toast-success",
      });
    },
  });
  const handleFollow = () => {
    followMutation.mutate();
  };
  return (
    <Button
      className="font-bold px-6"
      color="primary"
      radius="full"
      onClick={handleFollow}
    >
      Follow
    </Button>
  );
}
