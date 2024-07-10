"use client"

import { useState } from "react";
import './style.css';
import Image from "next/image";
import { Button } from "../ui/Button";

export const Timeline: React.FC = () => {
    const [index, setIndex] = useState<number>(0);

    const TIMELINES = [
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
        { date: "1 Jan 2024", name: "Waisak" },
    ];

    const timelineWidth = TIMELINES.length * 180;

    return (
        <div className='flex flex-col items-center gap-7'>
            <div className='gap-3 flex text-6xl font-semibold items-center'>
                <span className='text-ppmb-blue-600'>TIMELINE</span>
                <span>Kegiatan</span>
            </div>

            <div 
                className='timeline relative flex min-h-[160px] overflow-x-auto w-[90vw] scrollbar-hide pl-5' 
                style={{ '--timeline-width': `${timelineWidth}px` } as React.CSSProperties}
            >
                <div className="inline-flex">
                    {TIMELINES.map((timeline, key) => (
                        <div key={key} className={`${key % 2 === 1 ? 'self-end' : 'self-start'} flex flex-col items-center min-w-[180px]`}>
                            <div className="flex flex-col px-3 py-2 w-full rounded-xl items-center hover:bg-ppmb-100 hover:bg-opacity-70 cursor-pointer">
                                <div className="bg-gradient-to-r from-ppmb-blue-700 to-ppmb-blue-500 rounded-xl px-3 py-1 text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex">{timeline.date}</div>
                                <span className="font-semibold text-xl text-ppmb-800">{timeline.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full px-12 mt-5">
            <div className="flex flex-row justify-between w-full px-[60px] py-7 rounded-lg  border-[2px] border-ppmb-300">
                <div className="w-[65%] flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <text className="text-4xl font-semibold">Acara Placeholder</text>
                        <div className="flex">
                            <div className="bg-gradient-to-r from-ppmb-blue-700 to-ppmb-blue-500 rounded-xl px-3 py-1 text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex">12 Jun 2024</div>
                        </div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lorem purus, maximus sed est quis, hendrerit imperdiet nulla. Proin at sapien eget orci malesuada tincidunt. Vivamus a congue nibh, in suscipit massa. Mauris sapien nibh, aliquam ac maximus ut, auctor nec lacus. Nam tempor ut tortor eget consectetur.
                    </div>

                    <div className="flex h-full">
                        <div className="self-end">
                            <Button handleClick={() => {}} label="RSVP" variant="md"/>
                        </div>
                    </div>
                
                </div>

                <div className="w-[35%] flex items-center justify-center">
                    <Image 
                        alt="rett"
                        src={"/image/rett.jpg"}
                        width={350}
                        height={350}
                        className="rounded-lg"
                    />
                </div>
            </div>
            </div>

           
        </div>
    );
};
