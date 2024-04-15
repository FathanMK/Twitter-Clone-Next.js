import { ReactNode } from "react";
import NextUI from "./NextUI";
import NextTheme from "./NextTheme";
import QueryClient from "./QueryClient";
import Toast from "./Toast";
import Redux from "./Redux";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Redux>
      <QueryClient>
        <NextUI>
          <NextTheme>
            {children} <Toast />
          </NextTheme>
        </NextUI>
      </QueryClient>
    </Redux>
  );
}
