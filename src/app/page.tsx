'use client'

import { Carousel, Faq, Timeline } from '@/components';
import { useRouter } from 'next/navigation';
export default function Home() {
  return (
    <div className='min-h-screen gap-[60px] flex flex-col pb-10'>
      <Carousel />
      <Timeline />
      <Faq />
    </div>
  )
}
