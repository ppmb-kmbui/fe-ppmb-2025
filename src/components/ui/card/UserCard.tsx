"use client"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/utils/axios"
import { FriendProps } from "@/utils/interface"
import { facultyCase } from "@/utils/stringUtils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiCheck, HiPlus } from "react-icons/hi"

interface UserCardProps extends FriendProps {
    onAccept?: () => void
    onReject?: () => void
}

export const UserCard: React.FC<UserCardProps> = ({
    fullname, faculty, batch, status, imgUrl, id,
    onAccept, onReject
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
    const [isRejectLoading, setIsRejectLoading] = useState<boolean>(false);
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
            console.error("Error while following friend", error);
        } finally {
            setIsLoading(false);
        }
    }

    const accept = async () => {
        try{
            setIsAcceptLoading(true);
            await api({
                url: `api/connect/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDynamicStatus("accepted");
            onAccept?.();
        } catch (error: any) {
            console.error("Error while accepting friend", error);
        } finally {
            setIsAcceptLoading(false);
        }
    }

    const reject = async () => {
        try {
            setIsRejectLoading(true);
            await api({
                url: `api/networking/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setDynamicStatus("not_connected");
            onReject?.()
        } catch (error: any) {
            console.error("Error while rejecting friend", error)
        } finally {
            setIsRejectLoading(false)
        }
    }

    const createNetworkingTask = async () => {
        try{
            setIsLoading(true);
            await api({
                url: `api/networking/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDynamicStatus("sedang_networking");
        } catch (error: any) {
            console.error("Error while creating networking task", error);
        } finally {
            setIsLoading(false);
            router.push(`/networking/${id}`);
        }
    }

    const truncateFullname = (fullname: string) => {
        if (fullname.length > 30) {
            return fullname.slice(0, 27) + '...';
        }
        return fullname;
    }

    return (
        <div className="flex flex-col justify-between border-ppmb-100 border-[2px] px-3 py-4 lg:px-4 lg:py-5 rounded-xl min-h-[240px] lg:h-[270px] min-w-[160px] sm:min-w-[200px] sm:max-w-[200px] lg:min-w-[225px] lg:max-w-full shadow-ppmb-200 shadow-custom-sm md:shadow-custom">
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
                <text className="text-xs md:text-sm italic text-ppmb-600">{facultyCase(faculty)}, {batch}</text>
            </div>

            <div className="flex h-[15%] justify-center items-center">
                { batch != 2024 ? 
                    <button className="md:mx-2 border-ppmb-500 border-[2px] flex items-center justify-center rounded-lg w-full cursor-not-allowed min-h-[28px]">
                        <text className="text-ppmb-500 font-semibold text-sm lg:text-[16px]">Angkatan {batch}</text>
                    </button>
                :
                    <>
                        { dynamicStatus == "not_connected" && <button className={`${isLoading && "cursor-not-allowed opacity-80"} mx-2 bg-ppmb-blue-500 text-ppmb-000 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pr-2 min-h-[28px]`} onClick={follow} disabled={isLoading}>
                            { isLoading ? 
                                <div className="loader-button-xs w-[16px] h-[16px]"/> 
                            : 
                                <>
                                    <HiPlus className="text-white"/>
                                    <text className="font-medium text-sm lg:text-[16px]">Ikuti</text>
                                </>
                            }

                        </button>}

                        { dynamicStatus == "menunggu_konfirmasi" && <button className="md:mx-2 border-ppmb-warning border-[2px] flex items-center justify-center rounded-lg w-full cursor-not-allowed min-h-[28px]">
                            <text className=" text-ppmb-warning font-semibold">Menunggu...</text>
                        </button>}

                        { dynamicStatus == "meminta_konfirmasi" && <div className="flex flex-row w-full gap-[6px]">
                            <button className={`${isLoading && "cursor-not-allowed opacity-80"} border-ppmb-red-500 border-[2px] flex items-center justify-center rounded-lg w-full px-[6px] md:px-2 min-h-[28px]`} onClick={reject} disabled={isLoading}>
                                { isRejectLoading ? 
                                    <div className="loader-button-xs"/> 
                                : 
                                    <text className=" text-ppmb-red-500 font-semibold text-sm lg:text-[16px]">Tolak</text>
                                }
                            </button>

                            <button className={`${isLoading && "cursor-not-allowed opacity-80"} bg-ppmb-success flex items-center justify-center rounded-lg w-full px-3 md:px-4 min-h-[28px]`} onClick={accept} disabled={isLoading}>
                                { isAcceptLoading ? 
                                    <div className="loader-button-xs"/> 
                                :
                                    <text className="text-white font-medium text-sm lg:text-[16px]">Terima</text>
                                }
                            </button>
                        </div>}

                        { dynamicStatus == "accepted" && <button className={`${isLoading && "cursor-not-allowed opacity-80"} md:mx-2 bg-ppmb-blue-700 flex items-center justify-center py-[2px] rounded-lg w-full min-h-[28px]`} onClick={createNetworkingTask} disabled={isLoading}>
                            { isLoading ? 
                                <div className="loader-button-sm"/>
                            :
                                <text className=" text-ppmb-000 font-medium">Networking</text>
                            }
                        </button> }

                        { dynamicStatus == "sedang_networking" && <button className={`md:mx-2 bg-ppmb-blue-700 flex items-center justify-center py-[2px] rounded-lg w-full min-h-[28px]`} onClick={() => router.push(`/networking/${id}`)} >
                            <text className=" text-ppmb-000 font-medium">Networking</text>
                        </button> }

                        { dynamicStatus == "done" && <button className="md:mx-2 bg-ppmb-success text-ppmb-000 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pl-2 cursor-not-allowed font-medium min-h-[28px]">
                            <text className="font-medium">Selesai</text>
                            <HiCheck size={20}/>
                        </button>}
                    </>
                }
            </div>
        </div>
    )
}