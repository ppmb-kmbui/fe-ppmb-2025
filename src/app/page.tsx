"use client";

import { Background, Carousel, Faq, Timeline } from "@/components";
import withAuth from "@/hoc/withAuth";
import Image from "next/image";

import bgCariTeman from "@/assets/background/bg-cari-teman.png";

const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col pb-8">
      <Background image={bgCariTeman} />

      <Carousel />
      <Timeline />
      <Faq />
    </div>
  );
};

export default withAuth(Homepage, "optional");
