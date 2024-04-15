"use client";

import { useRouter } from "next/navigation";

export default function MainError() {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 sticky top-0 backdrop-blur-[100px] z-[10000]">
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push("/home")}
            className="hover-default transition-default h-8 w-8 rounded-full flex items-center justify-center"
          >
            <img
              className="filter-black dark:filter-white h-4 w-4"
              src="/icons/back.svg"
            />
          </button>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <p>Something went wrong!</p>
      </div>
    </div>
  );
}
