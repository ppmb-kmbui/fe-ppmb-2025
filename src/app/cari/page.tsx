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
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 px-[100px] flex flex-col py-10 gap-3 items-center">
                <div className="flex text-ppmb-800 justify-center items-center font-crimson text-5xl gap-2">
                    <text className="text-ppmb-000">NETWORKING</text>
                    <text>dengan</text>
                    <text>KMB</text>
                </div>

                <Input placeholder="Cari teman KMB" setValue={setSearchQuery} type="rounded" icon={<HiSearch />}/>

                <div className="text-white flex flex-col items-center text-center mt-4">
                    <text className="font-semibold text-lg">"Semangat buat para maba, jangan lupa networking"</text>
                    <text className="italic text-ppmb-100">── Salmon floss, Fasilkom 2024</text>
                </div>
            </div>

            <div className="grid grid-cols-5 mt-7 gap-6 px-10">
                {DATA.map((data, key) => (
                    <UserCard key={key} {...data}/>
                ))}
            </div>

            <div className="flex flex-col items-center py-14">
                <text className="font-crimson text-2xl font-semibold">Kirim pesan untuk teman-teman KMBUI kamu!</text>
                <div className="flex gap-4 items-center">
                    <Input icon={<HiOutlineChat />} placeholder="Kirim pesanmu!" setValue={setMessage} type="rounded" />
                    <Button handleClick={() => {}} label="Kirim"/>
                </div>
            </div>

        </div>
    )
}

export default CariPage;