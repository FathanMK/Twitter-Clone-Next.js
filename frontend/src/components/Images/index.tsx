import { useState } from "react";
import ImageModal from "./components/ImageModal";
import { MouseEvent } from "react";

interface Props {
  tweetId: string;
  images: string[];
  displayName: string;
  username: string;
  content: string;
  formatDateTo12HourStr: string;
  formatDay: string;
  totalReplies: number;
  likes: any[];
  profilePicture: string;
}

export default function Images({
  tweetId,
  images,
  displayName,
  username,
  content,
  formatDateTo12HourStr,
  formatDay,
  totalReplies,
  likes,
  profilePicture,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const imageProps = {
    tweetId,
    images,
    setIsModalOpen,
    displayName,
    username,
    content,
    formatDateTo12HourStr,
    formatDay,
    currentImage,
    totalReplies,
    likes,
    profilePicture,
  };

  const handleModalOpen = (
    e: MouseEvent<HTMLDivElement | HTMLAnchorElement>
  ) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  if (images.length === 1) {
    return (
      <>
        <div
          onClick={handleModalOpen}
          className="mt-2 max-h-[500px] rounded-md overflow-hidden"
        >
          <img
            className="h-full w-full object-cover transition-default hover:scale-105"
            src={images[0]}
          />
        </div>
        {isModalOpen && <ImageModal {...imageProps} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-md overflow-hidden border-[1px] border-rich-black/20 dark:border-ivory/20 max-h-[500px]">
          <a
            className="h-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              handleModalOpen(e);
              setCurrentImage(0);
            }}
          >
            <img
              className="h-full w-full object-cover transition-default hover:scale-105"
              src={images[0]}
            />
          </a>
          <a
            className="h-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              handleModalOpen(e);
              setCurrentImage(1);
            }}
          >
            <img
              className="h-full w-full object-cover transition-default hover:scale-105"
              src={images[1]}
            />
          </a>
        </div>
        {isModalOpen && <ImageModal {...imageProps} />}
      </>
    );
  }

  if (images.length === 3) {
    return (
      <>
        <div className="mt-2 flex rounded-md max-h-[500px] gap-1 overflow-hidden border-[1px] border-rich-black/20 dark:border-ivory/20">
          <a
            className="w-1/2 overflow-hidden cursor-pointer"
            onClick={(e) => {
              handleModalOpen(e);
              setCurrentImage(0);
            }}
          >
            <img
              className="h-full w-full object-cover transition-default hover:scale-105"
              src={images[0]}
            />
          </a>
          <div className="w-1/2 flex flex-col gap-1">
            <a
              className="h-1/2 overflow-hidden cursor-pointer"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(1);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[1]}
              />
            </a>
            <a
              className="h-1/2 overflow-hidden cursor-pointer"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(2);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[2]}
              />
            </a>
          </div>
        </div>
        {isModalOpen && <ImageModal {...imageProps} />}
      </>
    );
  }

  if (images.length === 4) {
    return (
      <>
        <div className="mt-2 flex flex-col rounded-md max-h-[500px] gap-1 overflow-hidden border-[1px] border-rich-black/20 dark:border-ivory/20">
          <div className="h-[250px] flex gap-1">
            <a
              className="w-1/2 overflow-hidden"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(0);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[0]}
              />
            </a>
            <a
              className="w-1/2 overflow-hidden"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(1);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[1]}
              />
            </a>
          </div>
          <div className="h-[250px] flex gap-1">
            <a
              className="w-1/2 overflow-hidden"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(2);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[2]}
              />
            </a>
            <a
              className="w-1/2 overflow-hidden"
              onClick={(e) => {
                handleModalOpen(e);
                setCurrentImage(3);
              }}
            >
              <img
                className="h-full w-full object-cover transition-default hover:scale-105"
                src={images[3]}
              />
            </a>
          </div>
        </div>
        {isModalOpen && <ImageModal {...imageProps} />}
      </>
    );
  }
}
