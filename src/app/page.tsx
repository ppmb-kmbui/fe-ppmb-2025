"use client";

import { Carousel, Faq, Timeline } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";

const Homepage = () => {
  return (
    <div className="w-full h-full">
      <Login />
    </div>
  );
};

export default withAuth(Homepage, "optional");
