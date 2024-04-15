"use client";

import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Divider, Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Profile from "./components/Profile";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const queryClient = useQueryClient();

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  useEffect(() => {
    setIsLoading(true);
    let timeout = setTimeout(() => {
      setDebouncedValue(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    async function getData() {
      const data = await queryClient.fetchQuery({
        queryKey: ["users", debouncedValue],
        queryFn: async () => {
          const res = await axiosInstance.get(`/user?u=${debouncedValue}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return res.data.users;
        },
      });
      setData(data);
      setIsLoading(false);
    }

    if (debouncedValue !== "") {
      getData().catch(console.error);
    }
  }, [debouncedValue]);

  return (
    <div className="relative z-[1000]">
      <Input
        aria-label="searchbar"
        ref={refs.setReference}
        {...getReferenceProps()}
        variant="flat"
        placeholder="Search profile or tweets"
        onChange={(e) => setQuery(e.currentTarget.value)}
        startContent={
          <img className="h-4 w-4 dark:filter-white" src="/icons/search.svg" />
        }
      />
      <AnimatePresence mode="wait">
        {isOpen && query !== "" && (
          <div
            {...getFloatingProps()}
            className={`mt-4 w-full bg-ivory absolute dark:bg-rich-black shadow rounded-md max-h-[300px] overflow-scroll border-[1px] border-rich-black/20 dark:border-ivory/20`}
          >
            {isLoading ? (
              <div className="p-4 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <Link
                  href={`/explore?query=${debouncedValue.replace(" ", "+")}`}
                  className="flex items-center px-3 py-2 cursor-pointer hover-default transition-default"
                >
                  <div className="h-[40px] w-[40px] flex items-center justify-center">
                    <img
                      className="h-4 w-4 filter-black dark:filter-white"
                      src="/icons/search.svg"
                    />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Search for '{debouncedValue}'
                  </p>
                </Link>
                <Divider />
                <div>
                  {data.map((item: any) => (
                    <Profile key={item.id} {...item} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
