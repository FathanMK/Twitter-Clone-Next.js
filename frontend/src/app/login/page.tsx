import { Metadata } from "next";

import ThemeToggle from "@/components/ThemeToggle";
import Form from "./_components/Form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for zer0",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen items-center  overflow-hidden">
      <section className="basis-1/2 h-full">
        <figure className="h-full w-full relative">
          <img
            src="/images/login-img.jpg"
            className="h-full w-full object-cover object-left"
          />
          <figcaption className="absolute bottom-0 left-0 z-[1] p-4 text-xs font-extralight">
            © Johnson Wang, Unsplash.com
          </figcaption>
          <div className="h-full w-full absolute inset-0 bg-gradient-to-r from-ivory/20 dark:from-rich-black/20 to-ivory dark:to-rich-black" />
        </figure>
      </section>
      <section className="basis-1/2 h-full flex flex-col leading-relaxed">
        <div className="p-4 flex justify-end bg-ivory dark:bg-rich-black">
          <ThemeToggle />
        </div>
        <Form />
      </section>
    </main>
  );
}
