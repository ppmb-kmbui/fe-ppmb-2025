import Image from "next/image"
import { useRouter } from "next/navigation"
import { HiPlus } from "react-icons/hi"

interface CardProps {
    name: string
    faculty: string
}

export const Card: React.FC<CardProps> = ({
    name, faculty
}) => {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-between border-ppmb-100 border-[2px] py-5 px-7 rounded-xl min-h-[260px] shadow-ppmb-200 shadow-custom">
            <div className="flex h-[45%] items-center justify-center">
                <div className="h-[90px] w-[90px] flex">
                    <Image 
                        src={"/image/ariana.jpg"}
                        alt="ariana"
                        width={90}
                        height={90}
                        className="rounded-full"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-1 mt-5 h-[40%] text-center ">
                <text className="font-crimson text-xl leading-none">{name}</text>
                <text className="text-sm italic text-ppmb-600">{faculty}</text>
            </div>

            <div className="flex h-[15%] justify-center items-center px-2 flex-col">
                {/* <button className="bg-ppmb-blue-500 text-ppmb-000 flex items-center gap-2 justify-center py-[2px] rounded-lg w-full pr-2">
                    <HiPlus className="text-white"/>
                    <text className="font-semibold">Ikuti</text>
                </button> */}

                {/* <button className="border-ppmb-warning border-[2px] flex items-center justify-center rounded-lg w-full cursor-default">
                    <text className=" text-ppmb-warning font-bold">Menunggu...</text>
                </button> */}

                {/* <div className="flex flex-row w-full gap-[6px]">
                    <button className="border-ppmb-red-500 border-[2px] flex items-center justify-center rounded-lg w-full px-2">
                        <text className=" text-ppmb-red-500 font-bold">Tolak</text>
                    </button> 

                    <button className="bg-ppmb-success flex items-center justify-center rounded-lg w-full px-4">
                        <text className=" text-white font-semibold">Terima</text>
                    </button>
                </div> */}

                <button className="bg-ppmb-blue-600 flex items-center justify-center py-[2px] rounded-lg w-full" onClick={() => router.push("/networking/dummy")}>
                    <text className=" text-ppmb-000 font-semibold">Networking</text>
                </button>
            </div>
        </div>
    )
}