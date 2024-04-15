import { Metadata } from "next";

import ThemeToggle from "@/components/ThemeToggle";
import Form from "./_components/Form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page for zer0",
};

export default function RegisterPage() {
  return (
    <main className="flex h-screen w-screen items-center  overflow-hidden">
      <section className="basis-1/2 h-full">
        <figure className="h-full w-full relative">
          <img
            src="/images/register-img.jpg"
            className="h-full w-full object-cover object-left"
          />
          <figcaption className="absolute bottom-0 left-0 z-[1] p-4 text-xs font-extralight">
            © John Tuesday, Unsplash.com
          </figcaption>
          <div className="h-full w-full absolute inset-0 bg-gradient-to-r from-ivory/20 dark:from-rich-black/20 to-ivory dark:to-rich-black" />
        </figure>
      </section>
      <section className="basis-1/2 h-full flex flex-col leading-relaxed">
        <div className="p-4 flex items-center justify-end bg-ivory dark:bg-rich-black">
          <ThemeToggle />
        </div>
        <div className="overflow-scroll my-10">
          <Form />
        </div>
      </section>
    </main>
  );
}
