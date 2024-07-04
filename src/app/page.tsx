'use client'

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Carousel } from '@/components';

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    <div className='min-h-screen'>
      <Carousel />
      
      <div className='mt-14 flex flex-col items-center'>
        <div className='gap-3 flex text-6xl font-crimson italic '>
          <text className='text-ppmb-blue-600'>TIMELINE</text>
          <text>Kegiatan</text>
        </div>

      </div>
    </div>
  )
}
