"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { HiCheck, HiPlus } from "react-icons/hi"

interface CardProps {
    fullname: string
    faculty: string
    batch: string
}

export const UserCard: React.FC<CardProps> = ({
    fullname, faculty, batch
}) => {
    const router = useRouter();

    const truncateFullname = (fullname: string) => {
        if (fullname.length > 30) {
            return fullname.slice(0, 27) + '...';
        }
        return fullname;
    }

    return (
        <div className="flex flex-col justify-between border-ppmb-100 border-[2px] px-3 py-4 lg:p-5 rounded-xl min-h-[230px] lg:min-h-[270px] min-w-[160px] lg:min-w-[225px] shadow-ppmb-200 shadow-custom">
            <div className="flex h-[45%] items-center justify-center">
                <div className="h-[75px] w-[75px] md:h-[90px] md:w-[90px] flex">
                    <Image
                        src={"/image/ariana.jpg"}
                        alt="ariana"
                        width={90}
                        height={90}
                        className="rounded-full"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-1 mt-4 mb-2 h-[40%] text-center">
                <text className="font-semibold md:text-lg leading-none">{truncateFullname(fullname)}</text>
                {/* TODO: Change batch to dynamic value */}
                <text className="text-xs md:text-sm italic text-ppmb-600">{faculty}, 2024</text>
            </div>

            <div className="flex h-[15%] justify-center items-center px-2 flex-col">
                <button className="bg-ppmb-blue-500 text-ppmb-000 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pr-2">
                    <HiPlus className="text-white"/>
                    <text className="font-medium">Ikuti</text>
                </button>

                {/* <button className="border-ppmb-warning border-[2px] flex items-center justify-center rounded-lg w-full cursor-default">
                    <text className=" text-ppmb-warning font-semibold">Menunggu...</text>
                </button> */}

                {/* <div className="flex flex-row w-full gap-[6px]">
                    <button className="border-ppmb-red-500 border-[2px] flex items-center justify-center rounded-lg w-full px-2">
                        <text className=" text-ppmb-red-500 font-semibold">Tolak</text>
                    </button> 

                    <button className="bg-ppmb-success flex items-center justify-center rounded-lg w-full px-4">
                        <text className=" text-white font-medium">Terima</text>
                    </button>
                </div> */}

                {/* <button className="bg-ppmb-blue-600 flex items-center justify-center py-[2px] rounded-lg w-full" onClick={() => router.push("/networking/dummy")}>
                    <text className=" text-ppmb-000 font-medium">Networking</text>
                </button> */}

                {/* <button className="bg-ppmb-200 text-ppmb-700 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pl-2 cursor-not-allowed font-medium">
                    <text className="font-medium">Selesai</text>
                    <HiCheck />
                </button> */}
            </div>
        </div>
    )
}