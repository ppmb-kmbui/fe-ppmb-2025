import { UserCard } from "@/components";
import Image from "next/image";

const ProfilPage: React.FC = () => {
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
        <div className="min-h-screen p-10 gap-10 flex flex-col">
            <div className="flex flex-row gap-10">
                <div className="flex w-[80%] flex-row bg-white rounded-lg p-8 gap-7 h-[200px] items-center shadow-custom">
                    <div className="flex h-[140px] w-[140px]">
                        <Image 
                            src={require("../../../public/image/ariana.jpg")}
                            alt={"Logo"}
                            width={140}
                            height={140}
                            className="rounded-full"
                        />
                    </div>

                    <div className="flex h-full min-w-[2px] bg-ppmb-800 rounded-lg"></div>

                    <div className="flex flex-col">
                        <text className="text-5xl font-crimson text-ppmb-800">Ariana Grande</text>
                        <text className="italic text-ppmb-500 text-lg">Fasilkom, 2024</text>
                    </div>
                </div>
                
                <div className="w-[20%] flex flex-col rounded-lg p-8 bg-white h-[200px] items-center justify-center gap-2 shadow-custom">
                    <text className="font-semibold text-7xl">36</text>
                    <text className="text-xl">pengikut</text>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <text className="font-crimson text-3xl">Sudah Berkenalan dengan</text>
                <div className="grid grid-cols-5 gap-6">
                    {DATA.map((data, key) => (
                        <UserCard key={key} {...data}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfilPage;