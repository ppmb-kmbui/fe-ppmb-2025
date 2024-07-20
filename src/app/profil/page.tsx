"use client"

import { UserCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Image from "next/image";
import { HiPencil } from "react-icons/hi";

const ProfilPage: React.FC = () => {

    const { user } = useAuth();

    // console.log(user);

    return (
        <div className="min-h-screen py-5 px-4 md:p-6 lg:p-10 gap-5 md:gap-10 flex flex-col">
            <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
                <div className="flex w-full md:w-[70%] lg:w-[80%] flex-row bg-white rounded-lg py-6 px-5 md:py-8 lg:p-8 gap-3 md:gap-5 lg:gap-7 h-[160px] md:h-[200px] items-center shadow-custom">
                    <div className="relative flex h-[95px] w-[95px] md:h-[140px] md:w-[140px]">
                        <Image 
                            src={user.imgUrl}
                            alt={"Logo"}
                            width={140}
                            height={140}
                            className="rounded-full"
                        />

                        <button className="absolute bottom-0 right-0 bg-white p-1 md:p-[7px] md:text-[20px] rounded-full text-ppmb-blue-600 border-[2px] border-ppmb-blue-600">
                            <HiPencil />
                        </button>
                    </div>

                    <div className="flex h-full min-w-[2px] bg-ppmb-800 rounded-lg"></div>

                    <div className="flex flex-col">
                        <text className="text-xl md:text-3xl lg:text-4xl font-semibold text-ppmb-800 leading-none">{user.fullname}</text>
                        {/* TODO: Change to valid batch */}
                        <text className="italic text-ppmb-500 text-sm md:text-lg">{user.faculty}, 2024</text>
                    </div>
                </div>
                
                <div className="w-full md:w-[30%] lg:w-[20%] flex flex-col rounded-lg p-3 md:p-8 bg-white md:h-[200px] items-center justify-center md:gap-2 shadow-custom">
                    <text className="font-medium text-3xl md:text-5xl lg:text-7xl">36</text>
                    <text className="text-sm md:text-xl">pengikut</text>
                </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-3 mt-2">
                <text className="text-xl md:text-2xl lg:text-3xl font-semibold">Sudah Berkenalan dengan</text>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                    {/* {DATA.map((data, key) => (
                        <UserCard key={key} {...data}/>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default withAuth(ProfilPage, 'authenticated');