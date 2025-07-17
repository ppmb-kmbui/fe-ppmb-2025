"use client";

import { Carousel, Faq, Timeline } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";

const Homepage = () => {
  const { isAuthenticated, token, isLoading, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col pb-8">
      <Carousel />
      <Timeline />
      <Faq />
    </div>
  );
};

export default withAuth(Homepage, "optional");
