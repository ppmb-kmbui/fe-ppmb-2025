"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Autoplay from "embla-carousel-autoplay";

import comingSoon from "@/assets/carousel-images/coming-soon-banner.svg";

export const Carousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [index, setIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const CONTENTS = [
    {
      src: comingSoon,
    },
  ];

  return (
    <div className="embla bg-neutral-light relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {CONTENTS.map((content, key) => (
            <div
              key={key}
              className="embla__slide flex items-center justify-center"
            >
              <Image
                src={content.src}
                alt={`content ${key}`}
                width={1400}
                height={20}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="text-ppmb-800 hover:bg-ppmb-100 hover:text-ppmb-700 absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white p-[6px] text-sm shadow md:left-4 md:p-2 md:text-[20px]"
        onClick={scrollPrev}
      >
        <HiChevronLeft />
      </button>

      <button
        className="text-ppmb-800 hover:bg-ppmb-100 hover:text-ppmb-700 absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white p-[6px] text-sm shadow md:right-4 md:p-2 md:text-[20px]"
        onClick={scrollNext}
      >
        <HiChevronRight />
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2 md:bottom-4">
        {Array.from({ length: CONTENTS.length }).map((_, key) => (
          <button
            key={key}
            className={`h-[5px] w-[5px] rounded-full md:h-[10px] md:w-[10px] ${index === key ? "bg-ppmb-800" : "bg-ppmb-200"}`}
            onClick={() => {
              emblaApi?.scrollTo(key);
              setIndex(key);
            }}
          />
        ))}
      </div>
    </div>
  );
};
