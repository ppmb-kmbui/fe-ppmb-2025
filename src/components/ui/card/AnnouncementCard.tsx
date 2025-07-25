"use client";

import { body } from "@/styles/fonts";
import Image, { StaticImageData } from "next/image";
import { tv } from "tailwind-variants";

export interface AnnouncementProps {
  name: string;
  description: string;
  img: StaticImageData;
  link: string;
}

export interface AnnouncementCardProps extends AnnouncementProps {
  color: "orange" | "blue" | "turquoise";
}

const announcementCardVariants = tv({
  base: `${body.className} flex w-full shadow-lg border-2 border-neutral-dark cursor-pointer flex-col items-center gap-2 rounded-2xl px-6 py-5 duration-300 ease-in-out hover:scale-[1.02]`,
  variants: {
    color: {
      orange: "bg-orange-100",
      blue: "bg-blue-100",
      turquoise: "bg-turquoise-100",
    },
  },
});

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  name,
  description,
  img,
  link,
  color = "blue",
}) => {
  return (
    <a
      className={announcementCardVariants({ color })}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="max-h-[250px] max-w-[250px]">
        <Image src={img} alt="announcement" width={280} height={280} />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-neutral-dark text-sm">{description}</p>
      </div>
    </a>
  );
};
