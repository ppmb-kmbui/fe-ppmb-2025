'use client'

import { Carousel, Faq, Timeline } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isAuthenticated, user, token } = useAuth();

  console.log("token di home", token);
  console.log(isAuthenticated);
  
  return (
    <div className='min-h-screen gap-[60px] flex flex-col pb-10'>
      <Carousel />
      {/* <Timeline />
      <Faq /> */}
    </div>
  )
}
