"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CreateReplyContext } from "../../providers";

export default function Images() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { files, setFiles, setValue } = useContext(CreateReplyContext);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    watchDrag: false,
  });

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(indexToRemove, 1);
    setValue("images", updatedFiles);
    setFiles(updatedFiles);
  };

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden rounded-md">
      {files.length === 1 && (
        <div className="flex flex-[0_0_100%] relative min-w-0">
          <img className="object-cover" src={URL.createObjectURL(files[0])} />
          <div className="p-4 absolute right-0">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center transition-default hover:bg-red-500 bg-red-500/90"
              onClick={() => removeFile(0)}
            >
              <img className="filter-white w-3 h-3" src="/icons/close.svg" />
            </button>
          </div>
        </div>
      )}
      <div className="flex">
        {files.length > 1 && (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {files.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-[0_0_calc(50%-7px)] relative min-w-0"
                >
                  <img
                    className="object-cover rounded-md"
                    src={URL.createObjectURL(item)}
                  />
                  <div className="p-4 absolute right-0">
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-default hover:bg-red-500 bg-red-500/90"
                      onClick={() => removeFile(index)}
                    >
                      <img
                        className="filter-white w-3 h-3"
                        src="/icons/close.svg"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {files.length > 2 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 mx-2 mt-6 mb-2">
            <button
              disabled={selectedIndex === 0}
              onClick={onPrevButtonClick}
              className="disabled:cursor-not-allowed"
            >
              <img
                className={`${
                  selectedIndex === 0 ? "filter-gray" : "filter-white"
                } h-4 w-4 rotate-180`}
                src="/icons/right-arrow.svg"
              />
            </button>
            <button
              disabled={selectedIndex === files.length - 2}
              onClick={onNextButtonClick}
              className="disabled:cursor-not-allowed"
            >
              <img
                className={`${
                  selectedIndex === files.length - 2
                    ? "filter-gray"
                    : "filter-white"
                } h-4 w-4`}
                src="/icons/right-arrow.svg"
              />
            </button>
          </div>
          <div className="mx-2 flex items-center gap-2">
            {Array.from(Array(files.length - 1).keys()).map((item: any) => (
              <button
                key={item}
                className={`h-2 w-2 ${
                  item === selectedIndex ? "bg-blue-500" : "bg-gray-500"
                } rounded-full`}
                onClick={() => onDotButtonClick(item)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
