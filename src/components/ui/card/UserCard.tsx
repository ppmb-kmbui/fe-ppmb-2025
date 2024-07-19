"use client"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/utils/axios"
import { FriendProps } from "@/utils/interface"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiCheck, HiPlus } from "react-icons/hi"

export const UserCard: React.FC<FriendProps> = ({
    fullname, faculty, batch, status, imgUrl, id
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dynamicStatus, setDynamicStatus] = useState<typeof status>(status); // connect response doesnt retrun typeof status, so need to manually change it :)

    const { token } = useAuth();

    const follow = async () => {
        try {
            setIsLoading(true)
            await api({
                url: `api/connect/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setDynamicStatus("menunggu_konfirmasi");
        } catch (error: any) {
            console.error("Error in following friend", error);
        } finally {
            setIsLoading(false);
        }
    }

    const accept = async () => {
        try{
            setIsLoading(true);
            await api({
                url: `api/connect/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDynamicStatus("accepted");
        } catch (error: any) {
            console.error("Error in accepting friend", error);
        } finally {
            setIsLoading(false);
        }
    }

    const reject = async () => {
        // TODO: Ask backend to implement reject
    }

    const truncateFullname = (fullname: string) => {
        if (fullname.length > 30) {
            return fullname.slice(0, 27) + '...';
        }
        return fullname;
    }

    return (
        <div className="flex flex-col justify-between border-ppmb-100 border-[2px] px-3 py-4 lg:p-5 rounded-xl min-h-[230px] lg:min-h-[270px] min-w-[160px] lg:min-w-[225px] shadow-ppmb-200 shadow-custom">
            <div className="flex h-[45%] items-center justify-center">
                <div className="h-[80px] w-[80px] md:h-[90px] md:w-[90px] flex">
                    <Image
                        src={imgUrl}
                        alt="tidak submit foto"
                        width={95}
                        height={95}
                        className="rounded-full"
                        objectFit="contain"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-1 mt-4 mb-2 h-[40%] text-center">
                <text className="font-semibold md:text-lg leading-none">{truncateFullname(fullname)}</text>
                <text className="text-xs md:text-sm italic text-ppmb-600">{faculty}, {batch}</text>
            </div>

            <div className="flex h-[15%] justify-center items-center">
                { dynamicStatus == "not_connected" && <button className={`${isLoading && "cursor-not-allowed opacity-80"} mx-1 bg-ppmb-blue-500 text-ppmb-000 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pr-2`} onClick={follow} disabled={isLoading}>
                    <HiPlus className="text-white"/>
                    <text className="font-medium">Ikuti</text>
                </button>}

                { dynamicStatus == "menunggu_konfirmasi" && <button className="mx-1 border-ppmb-warning border-[2px] flex items-center justify-center rounded-lg w-full cursor-not-allowed">
                    <text className=" text-ppmb-warning font-semibold">Menunggu...</text>
                </button>}

                { dynamicStatus == "meminta_konfirmasi" && <div className="flex flex-row w-full gap-[6px]">
                    <button className={`${isLoading && "cursor-not-allowed opacity-80"} border-ppmb-red-500 border-[2px] flex items-center justify-center rounded-lg w-full px-2`} onClick={reject} disabled={isLoading}>
                        <text className=" text-ppmb-red-500 font-semibold">Tolak</text>
                    </button> 

                    <button className={`${isLoading && "cursor-not-allowed opacity-80"} bg-ppmb-success flex items-center justify-center rounded-lg w-full px-4`} onClick={accept} disabled={isLoading}>
                        <text className="text-white font-medium">Terima</text>
                    </button>
                </div>}

                { dynamicStatus == "accepted" && <button className="mx-1 bg-ppmb-blue-700 flex items-center justify-center py-[2px] rounded-lg w-full" onClick={() => router.push("/networking/dummy")}>
                    <text className=" text-ppmb-000 font-medium">Networking</text>
                </button>}

                {/* <button className="bg-ppmb-200 text-ppmb-700 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pl-2 cursor-not-allowed font-medium">
                    <text className="font-medium">Selesai</text>
                    <HiCheck />
                </button> */}
            </div>
        </div>
    )
}