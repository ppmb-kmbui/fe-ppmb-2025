'use client'

import { Carousel, Timeline } from '@/components';
import { useRouter } from 'next/navigation';
export default function Home() {
const router = useRouter()
  return (
    <div className='min-h-screen'>
      <Carousel />
      {/* <Timeline /> */}

      <div className='mt-10 w-full flex flex-col items-center'>
        <text className='text-6xl font-crimson italic text-ppmb-blue-600'>FAQ</text>
      </div>
    </div>
  )
}
