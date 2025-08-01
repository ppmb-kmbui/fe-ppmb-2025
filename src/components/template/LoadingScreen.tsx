import Image from "next/image";

import mascot from "@/assets/graphic-elements/mascot.svg";
import { Background } from "./Background";
import bgAuth from "@/assets/background/bg-auth-wider.png";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="bg-ppmb- flex min-h-screen flex-col items-center justify-center gap-5 px-[60px]">
      <Background image={bgAuth} />
      <Image src={mascot} alt="mascot" width={600} height={600} />

      <div className="text-center text-3xl font-semibold">
        <p>Loading</p>
        <span className="animate-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </div>
    </div>
  );
};
