"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

function AppCarousel({
  className,
  images,
}: {
  className?: string;
  images?: string[];
}) {
  return (
    <Carousel
      className={`relative h-96 ${className || ""}`}
      autoplay={true}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images?.map((image, i) => (
        <Image
          key={i}
          src={image}
          alt={`image ${i}`}
          className="h-full w-full object-cover"
          fill={true}
        />
      ))}
    </Carousel>
  );
}

export default AppCarousel;
