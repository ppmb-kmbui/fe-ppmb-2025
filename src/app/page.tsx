"use client";

import { Carousel, Faq, Timeline } from "@/components";
import withAuth from "@/hoc/withAuth";
import Image from "next/image";

import bgCariTeman from "@/assets/background/bg-cari-teman.png";

const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col pb-8">
      {/* Background for entire page */}
      <Image
        src={bgCariTeman}
        alt=""
        sizes="100vw"
        className="absolute top-0 -z-10 opacity-50"
      />

      <Carousel />
      <Timeline />
      <Faq />
    </div>
  );
};

export default withAuth(Homepage, "optional");
