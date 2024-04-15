"use client";

import useEmblaCarousel from "embla-carousel-react";

export default function Test() {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div ref={emblaRef}>
      <p>Hello World</p>
    </div>
  );
}
