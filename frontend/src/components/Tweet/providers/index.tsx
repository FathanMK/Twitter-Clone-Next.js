import { createContext, ReactNode } from "react";
import { Props } from "../interface/Props";

interface ExtendProps extends Props {
  children: ReactNode;
}

export const TweetContext = createContext({} as Props);

export default function TweetProvider({ children, ...props }: ExtendProps) {
  return (
    <TweetContext.Provider value={{ ...props }}>
      {children}
    </TweetContext.Provider>
  );
}
