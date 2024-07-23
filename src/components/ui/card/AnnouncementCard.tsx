"use client"

import { AnnouncementProps } from "@/app/pengunguman/page"
import Image from "next/image"

interface AnnouncementCardProps extends AnnouncementProps {}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
    name, description, img, link
}) => {
    return (
        <a className="bg-gradient-to-br from-white from-[50%] to-ppmb-100 w-full flex-1 flex flex-col items-center rounded-2xl border-[2px] border-ppmb-800 shadow-custom cursor-pointer px-6 pt-1 pb-5 gap-2 hover:scale-[1.02] ease-in-out duration-300" href={link} target="_blank" rel="noopener noreferrer">
            <div className="max-w-[250px] max-h-[250px]">
                <Image
                    src={img}
                    alt="announcement"
                    width={280}
                    height={280}
                />
            </div>

            <div className="flex flex-col items-center text-center gap-1">
                <text className="text-xl font-semibold">{name}</text>
                <text className="text-ppmb-700">{description}</text>
            </div>
        </a>
    )
}