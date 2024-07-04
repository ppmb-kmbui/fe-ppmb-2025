"use client"

import { useState } from "react"
import './style.css';



export const Timeline: React.FC = () => {
    const [index, setIndex] = useState<number>(0);

    const TIMELINES = [
        {
            date: "10 Mei 2024",
            name: "Makrab 2024",
        },
        {
            date: "18 Aug 2024",
            name: "KMBUI Fest",
        },
        {
            date: "22 Sep 2024",
            name: "Simus KMBUI",
        },
        {
            date: "24 Okt 2024",
            name: "Natal",
        },
        {
            date: "24 Okt 2024",
            name: "Natal",
        },
        {
            date: "24 Okt 2024",
            name: "Natal",
        },
        {
            date: "24 Okt 2024",
            name: "Natal",
        },
    ]

    return (
        <div className='mt-8 flex flex-col items-center'>
            <div className="flex flex-col gap-1 items-center text-ppmb-800">
                <div className='gap-3 flex text-6xl font-crimson italic'>
                    <text className='text-ppmb-blue-600'>TIMELINE</text>
                    <text>Kegiatan</text>
                </div>

                <text className="text-sm font-medium text-ppmb-600">scroll timeline secara horizontal untuk melihat informasi yang lebih lengkap</text>

            </div>


            <div className={`timeline relative flex mt-7 min-h-[180px] overflow-x-auto w-screen pl-5`}>
                <div className="inline-flex">
                    {TIMELINES.map((timeline, key) => (
                        <div key={key} className={`${key%2==1 && 'self-end'} flex flex-col items-center min-w-[180px]`}>
                            <div className="flex flex-col px-3 py-2 w-full rounded-xl items-center hover:bg-ppmb-100 hover:bg-opacity-70 cursor-pointer">
                                <div className="bg-gradient-to-r from-ppmb-blue-700 to-ppmb-blue-500 rounded-xl px-3 py-1 text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex">{timeline.date}</div>
                                <text className="font-crimson text-2xl text-ppmb-800">{timeline.name}</text>
                            </div>
                                

                        </div>
                    ))}

                </div>
  
            </div>

      </div>
    )
}