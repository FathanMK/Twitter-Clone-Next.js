"use client";

import { ChangeEvent, useContext, useRef } from "react";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Images from "../Images";
import { CreateTweetContext } from "../../providers";
import { toast } from "sonner";
import { useAppSelector } from "@/interface/useAppSelector";

const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export default function Input() {
  const {
    files,
    setFiles,
    tweet,
    setValue,
    register,
    images,
    handleSubmit,
    onSubmit,
    isLoading,
  } = useContext(CreateTweetContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const remainingCharacters = 280 - tweet.length;
  const { user } = useAppSelector((state) => state.user);

  const calculateProgress = (charCount: number) => {
    const clampedCharCount = Math.min(Math.max(charCount, 0), 280);
    const progress = (clampedCharCount / 280) * 100;
    return progress;
  };

  const handleFileOpen = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      if (!IMAGE_TYPES.includes(file.type)) {
        toast.error("Image must be .jpeg, .jpg, .png, .avif, .webp", {
          className: "toast-error",
        });
      } else {
        setFiles([...files, file]);
        setValue("images", [...files, file]);
      }
    }
  };

  return (
    <div className="flex gap-4 border-b-[1px] border-rich-black/20 dark:border-ivory/20 p-4">
      <Avatar size="md" src={user.profilePicture} />
      <div className="w-full">
        <ReactTextareaAutosize
          {...register("tweet")}
          maxLength={280}
          aria-label="tweet"
          className="w-full pt-2 pb-4 placeholder:text-gray-600 focus-visible:outline-none resize-none bg-transparent"
          placeholder="What's happening?"
        />
        {files && <Images />}
        <div className="sticky bottom-0 bg-white dark:bg-black flex items-center justify-between">
          <div className="flex mt-4 items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgress
                aria-label="circular tweet progress"
                value={calculateProgress(tweet.length)}
                classNames={{
                  svg: `w-6 h-6 ${
                    remainingCharacters === 0
                      ? "text-red-500"
                      : remainingCharacters < 10
                      ? "text-yellow-500"
                      : "text-blue-500"
                  }`,
                }}
              />
              <p
                className={`text-[10px] ${
                  remainingCharacters === 0
                    ? "text-red-500"
                    : remainingCharacters < 10
                    ? "text-yellow-500"
                    : "text-blue-500"
                } font-bold`}
              >
                {remainingCharacters}
              </p>
            </div>
            <button
              disabled={images.length === 4}
              className={`h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#3681f6]/20 transition-default disabled:hover:bg-transparent disabled:cursor-not-allowed group`}
              onClick={handleFileOpen}
            >
              <img
                className={`h-4 w-4 filter-blue group-disabled:filter-gray group-disabled:opacity-50`}
                src="/icons/image.svg"
              />
            </button>
          </div>
          <Button
            isDisabled={
              (images.length === 0 && tweet.length === 0) || isLoading
            }
            color="primary"
            size="sm"
            radius="full"
            className="text-sm font-bold px-6"
            onClick={handleSubmit(onSubmit)}
          >
            Post
          </Button>
        </div>
      </div>
      <input
        ref={inputRef}
        accept=".jpg, .jpeg, .avif, .webp, .png"
        type="file"
        onChange={handleFileOnChange}
        className="hidden"
      />
    </div>
  );
}
