'use client'

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Autoplay from 'embla-carousel-autoplay';

export const Carousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [index, setIndex] = useState(0);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const CONTENTS = [
    {
      src: '/sponsorImage/kmbui.png'
    },
    {
      src: '/sponsorImage/kmbui.png'
    }
  ]

  return (
      <div className='embla relative'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {CONTENTS.map((content, key) => (
            <div key={key} className='embla__slide flex items-center justify-center'>
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

      <button className='absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white p-[6px] md:p-2 rounded-full shadow text-ppmb-800 hover:bg-ppmb-100 hover:text-ppmb-700 text-sm md:text-[20px]' onClick={scrollPrev}>
        <HiChevronLeft />
      </button>
      
      <button className='absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white p-[6px] md:p-2 rounded-full shadow text-ppmb-800 hover:bg-ppmb-100 hover:text-ppmb-700 text-sm md:text-[20px]' onClick={scrollNext}>
        <HiChevronRight />
      </button>

      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: CONTENTS.length }).map((_, key) => (
          <button 
            key={key} 
            className={`w-[5px] h-[5px] md:w-[10px] md:h-[10px] rounded-full ${index === key ? 'bg-ppmb-800' : 'bg-ppmb-200'}`} 
            onClick={() => { emblaApi?.scrollTo(key); setIndex(key); }} 
          />
        ))}
      </div>
    </div>
  )
}