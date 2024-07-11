"use client"

import { Button, UserCard, Input } from "@/components";
import { useState } from "react";
import { HiOutlineChat, HiSearch } from "react-icons/hi";

const CariPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [message, setMessage] = useState<string>("");

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
        <div className="min-h-screen flex flex-col">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-300 px-[30px] md:px-[100px] flex flex-col py-10 gap-3 items- w-full">
                <div className="flex text-ppmb-800 justify-center items-center text-xl md:text-3xl lg:text-4xl gap-2 font-semibold">
                    <text className="text-ppmb-000">NETWORKING</text>
                    <text>dengan</text>
                    <text>KMB</text>
                </div>

                <Input placeholder="Cari teman KMB" setValue={setSearchQuery} type="rounded" icon={<HiSearch />}/>

                <div className="text-white flex flex-col items-center text-center mt-2 md:mt-4">
                    <text className="font-semibold md:text-lg">"Semangat buat para maba, jangan lupa networking"</text>
                    <text className="italic text-ppmb-100 font-light text-sm md:text-[16px]">── Salmon floss, Fasilkom 2024</text>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-3 md:mt-5 lg:mt-7 gap-3 md:gap-7 lg:gap-7 px-3 md:px-5 lg:px-7">
                {DATA.map((data, key) => (
                    <UserCard key={key} {...data}/>
                ))}
            </div>

            <div className="flex flex-col items-center py-14 gap-[2px] md:gap-1 w-full px-8 lg:px-[100px]">
                <text className="text-lg md:text-2xl font-semibold">Kirim pesan untuk teman-teman KMBUI kamu!</text>
                <div className="flex gap-2 md:gap-4 items-center w-full justify-center">
                    <Input icon={<HiOutlineChat />} placeholder="Kirim pesanmu!" setValue={setMessage} type="rounded" />
                    <Button handleClick={() => {}} label="Kirim" variant="lg"/>
                </div>
            </div>

        </div>
    )
}

export default CariPage;