"use client";

import { FloatingOverlay } from "@floating-ui/react";
import { Avatar } from "@nextui-org/react";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

import CreateReply from "@/app/(main)/[user]/(status)/status/[id]/_components/CreateReply";
import Status from "@/components/Status";
import axiosInstance from "@/libs/axiosInstance";
import { ITweet } from "@/interface/ITweet";
import Tweet from "@/components/Tweet";
import Loading from "@/components/Loading";

interface Props {
  tweetId: string;
  images: string[];
  currentImage: number;
  setIsModalOpen: any;
  displayName: string;
  username: string;
  content: string;
  formatDateTo12HourStr: string;
  formatDay: string;
  totalReplies: number;
  likes: any[];
  profilePicture: string;
}

export default function ImageModal({
  tweetId,
  images,
  currentImage = 0,
  setIsModalOpen,
  displayName,
  username,
  content,
  formatDateTo12HourStr,
  formatDay,
  totalReplies,
  likes,
  profilePicture,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const token = getCookie("token");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["tweet", tweetId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tweet/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.tweet;
    },
  });

  const checkClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const onPrevButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    emblaApi?.scrollPrev();
  };

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    emblaApi?.scrollNext();
  };

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(currentImage, true);
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect, currentImage]);

  if (isLoading) return <Loading />;

  return (
    <>
      <FloatingOverlay
        className="bg-black/90 flex z-[10000]"
        onClick={checkClick}
      >
        <div className="flex-1 flex items-center relative overflow-hidden justify-center z-[10001]">
          <button className="w-10 h-10 absolute top-0 left-0 m-4 rounded-full flex items-center justify-center hover-default transition-default">
            <img className="w-4 h-4 filter-white" src="/icons/close.svg" />
          </button>
          {images.length === 1 ? (
            <div onClick={(e) => e.stopPropagation()}>
              <img src={images[0]} />
            </div>
          ) : (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {images.map((item) => (
                  <div className="flex-[0_0_100%] flex justify-center items-center">
                    <img className="h-2/3 w-2/3 object-contain" src={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            disabled={selectedIndex === 0}
            onClick={(e) => onPrevButtonClick(e)}
            className="absolute left-0 p-4 disabled:cursor-not-allowed"
          >
            <img
              className={`${
                selectedIndex === 0 ? "filter-gray" : "filter-white"
              } h-6 w-6 rotate-180`}
              src="/icons/right-arrow.svg"
            />
          </button>
          <button
            disabled={selectedIndex === images.length - 1}
            onClick={(e) => onNextButtonClick(e)}
            className="absolute right-0 p-4 disabled:cursor-not-allowed"
          >
            <img
              className={`${
                selectedIndex === images.length - 1
                  ? "filter-gray"
                  : "filter-white"
              } h-6 w-6`}
              src="/icons/right-arrow.svg"
            />
          </button>
        </div>
        <div
          className="w-[400px] bg-black z-[10001] overflow-scroll border-l-[1px] border-rich-black/20 dark:border-ivory/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <Avatar src={profilePicture} />
              <div>
                <p className="font-semibold max-w-[300px] truncate">
                  {displayName}
                </p>
                <p className="text-sm text-gray-500">@{username}</p>
              </div>
            </div>
            <div className="flex flex-col w-full pt-2">
              <p className="text-lg tracking-wider">{content}</p>
            </div>
            <div className="py-4 flex items-center gap-1 border-b-[1px] border-rich-black/20 dark:border-ivory/20">
              <p className="text-sm text-gray-500">{formatDateTo12HourStr}</p>
              <p className="text-sm text-gray-500">·</p>
              <p className="text-sm text-gray-500">{formatDay}</p>
            </div>
            <div className="py-4 border-b-[1px] border-rich-black/20 dark:border-ivory/20">
              <div className="flex items-center gap-10">
                <Status
                  tweetId={tweetId}
                  totalReplies={totalReplies}
                  likes={likes}
                />
              </div>
            </div>
            <div className="py-4">
              <CreateReply tweetId={tweetId} />
            </div>
          </div>
          <div className="border-t-[1px] border-rich-black/20 dark:border-ivory/20">
            {data.replies.map((item: ITweet) => (
              <Tweet
                mainProps={{
                  className:
                    "border-b-[1px] border-rich-black/20 dark:border-ivory/20",
                }}
                id={item.id}
                images={item.images}
                content={item.content}
                createdAt={item.createdAt}
                displayName={item.user.displayName}
                username={item.user.username}
                likes={item.likes}
                totalReplies={item.replies.length}
                profilePicture={item.user.profilePicture}
              />
            ))}
          </div>
        </div>
      </FloatingOverlay>
    </>
  );
}
