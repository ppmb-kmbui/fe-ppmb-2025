'use client'

import { Carousel, Faq, Timeline } from '@/components';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/hoc/withAuth';

const Homepage = () => {
  const { isAuthenticated, token, isLoading, user } = useAuth();

  // console.log(user, "ini user")

  // console.log("token di home", token);
  console.log(isAuthenticated);
  
  return (
    <div className='min-h-screen gap-5 md:gap-8 flex flex-col pb-8'>
      <Carousel />
      <Timeline />
      <Faq />
    </div>
  )
}

export default withAuth(Homepage, 'optional');
