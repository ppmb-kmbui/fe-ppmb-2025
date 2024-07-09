import { UserCard } from "@/components";
import Image from "next/image";

const NetworkingPage: React.FC = () => {
    const DATA = [
        {
            name: "Ariana Grande",
            faculty: "FEB, 2024"
        },
        {
            name: "Lana del Rey",
            faculty: "FIB, 2024"
        },
        {
            name: "Billie Eilish",
            faculty: "FT, 2024"
        },
        {
            name: "Jennie BLACKPINK",
            faculty: "FEB, 2024"
        },
        {
            name: "Stephen Sanchez",
            faculty: "Fasilkom, 2024"
        },
        {
            name: "Taylor Swift",
            faculty: "FH, 2024"
        },
        {
            name: "DJ Python Typescript Yeehaw",
            faculty: "FF, 2024"
        },
        {
            name: "Nadin Amizah",
            faculty: "Fpsi, 2024"
        },
        {
            name: "NIKI",
            faculty: "FEB, 2024"
        },
    ]

    return (
        <div className="min-h-screen flex flex-col gap-10 pb-10">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-semibold text-[21px] leading-[1.8] text-ppmb-000">
                    Networking KMBUI
                </text>

                <Image
                    src={require("../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="pl-[40px] lg:pl-[60px]">
                <text className="text-[27px] leading-[1.6] font-semibold">Menunggu Persetujuan</text>

                <div className="flex flex-row overflow-x-auto max-w-[84vw] lg:max-w-[89vw] items-center gap-5 scrollbar-hide py-3 pr-3">
                    {DATA.map((data, key) => (
                        <UserCard key={key} name={data.name} faculty={data.faculty} />
                    ))}

                    {/* <text className="text-lg italic w-full text-ppmb-500">Tidak ada permintaan pertemanan :(</text> */}
                </div>
            </div>

            <div className="pl-[40px] lg:pl-[60px]">
                <text className="text-[27px] leading-[1.6] font-semibold">Lanjutkan Networking</text>

                <div className="flex flex-row overflow-x-auto max-w-[84vw] lg:max-w-[89vw] items-center gap-5 scrollbar-hide py-3 pr-3">
                    {DATA.map((data, key) => (
                        <UserCard key={key} name={data.name} faculty={data.faculty} />
                    ))}

                    {/* <text className="text-lg italic w-full text-ppmb-500">Tidak ada teman yang bisa di-networking saat ini, silahkan follow teman pada page Cari!</text> */}
                </div>
            </div>
        </div>
    )
}

export default NetworkingPage;