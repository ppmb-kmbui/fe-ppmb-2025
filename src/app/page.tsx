'use client'

import { Carousel, Faq, Timeline } from '@/components';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/hoc/withAuth';

const Homepage = () => {
  const { isAuthenticated, token, isLoading } = useAuth();

  console.log("token di home", token);
  console.log(isAuthenticated);
  
  return (
    <div className='min-h-screen gap-5 md:gap-10 xl:gap-[60px] flex flex-col pb-10'>
      <Carousel />
      <Timeline />
      <Faq />
      {/* {token} */}
    </div>
  )
}

export default withAuth(Homepage, 'optional');
