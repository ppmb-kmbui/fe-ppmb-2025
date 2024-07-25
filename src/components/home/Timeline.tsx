"use client"

import { useState } from "react";
import './style.css';
import Image from "next/image";
import { Button } from "../ui/Button";
import { dateToIndonesianString } from "@/utils/date";
import { TbBrandZoom } from "react-icons/tb";
import Link from "next/link";

interface TimelineProps {
    name: string
    description: string
    startDate: Date
    endDate: Date
    img: string
    rsvp?: string
    zoom?: string

}
export const Timeline: React.FC = () => {
    const [index, setIndex] = useState<number>(0);

    const TIMELINES: TimelineProps[] = [
        {
            name: "WelMab Part 1",
            description: "Welcoming MaBa Part 1 merupakan sebuah acara untuk mengenal dan saling berkenalan dengan mahasiswa baru yang masuk melalui jalur SNBP. Sebagai mahasiswa baru yang belum familiar dengan lingkungan UI, pada acara ini akan diperkenalkan lingkungan-lingkungan di UI seperti ada fakultas apa saja dan sarana prasarana apa saja yang disediakan oleh UI.",
            startDate: new Date(2024, 4, 11),
            endDate: new Date(2024, 4, 11),
            img: "/image/welmab-1.jpg",
        },
        {
            name: "Pre-event",
            description: "Pre-event merupakan acara PPMB 2024 untuk memperkenalkan KMBUI serta menjelaskan terkait main-event yaitu tugas-tugas yang perlu dikerjakan oleh mahasiswa baru.",
            startDate: new Date(2024, 7, 3),
            endDate: new Date(2024, 7, 3),
            img: "/image/pre-event.jpg",
            zoom: "https://www.ristek.link/WelmabKMB2024"
        },
        {
            name: "Display UKM",
            description: "Lorem ipsum.",
            startDate: new Date(2024, 7, 13),
            endDate: new Date(2024, 7, 14),
            img: "/image/eternal-sunshine.jpg",
        },
        {
            name: "Insight Hunting",
            description: "Insight Hunting menjadi sarana untuk menggali wawasan dari narasumber yang berpengalaman di kategori beasiswa, organisasi, lomba, dan student exchange.",
            startDate: new Date(2024, 7, 5),
            endDate: new Date(2024, 7, 9),
            img: "/image/insight-hunting.jpg",
        },
        {
            name: "Mentoring",
            description: "Pada sesi mentoring, maba secara berkelompok mengenal KMBUI, ajaran buddha, dan kehidupan perkuliahan.",
            startDate: new Date(2024, 7, 5),
            endDate: new Date(2024, 7, 28),
            img: "/image/mentoring.jpg",
        },
        {
            name: "KMBUI Explorer",
            description: "Yuk, ikuti keseruan kegiatan/proker di KMBUI!!",
            startDate: new Date(2024, 7, 5),
            endDate: new Date(2024, 8, 11),
            img: "/image/kmbui-explorer.jpg",
        },
        {
            name: "Networking",
            description: "Networking menjadi kesempatan untuk mencari teman sesama maba maupun kakak tingkat.",
            startDate: new Date(2024, 7, 10),
            endDate: new Date(2024, 7, 31),
            img: "/image/networking.jpg",
        },
        {
            name: "Foster sibling",
            description: "Kakak asuh membimbing adiknya dalam menyesuaikan diri dengan kehidupan perkuliahan. Melalui kegiatan sharing insight dan fun activity, hubungan akan menjadi semakin erat.",
            startDate: new Date(2024, 7, 16),
            endDate: new Date(2024, 7, 29),
            img: "/image/fossib.jpg",
        },
        {
            name: "Closing PPMB",
            description: "Closing merupakan acara puncak dari seluruh rangkaian kegiatan PPMB 2024.",
            startDate: new Date(2024, 8, 21),
            endDate: new Date(2024, 8, 21),
            img: "/image/closing.jpg",
            rsvp: "hi"
        },
    ];

    return (
        <div className='flex flex-col items-center gap-3 lg:gap-5'>
            <div className='gap-1 lg:gap-3 flex text-3xl md:text-4xl lg:text-6xl font-semibold items-center'>
                <span className='text-ppmb-blue-600'>TIMELINE</span>
                <span>Kegiatan</span>
            </div>

            <div className='hidden timeline relative lg:flex min-h-[175px] overflow-x-auto w-[90vw] scrollbar-hide pl-5'>
                <div className="inline-flex">
                    {TIMELINES.map((timeline, key) => (
                        <div key={key} className={`${key % 2 === 1 ? 'self-end' : 'self-start'} li flex flex-col items-center min-w-[200px]`}>
                            <div className="flex flex-col px-3 py-2 w-full rounded-2xl items-center hover:bg-ppmb-100 hover:bg-opacity-70 cursor-pointer" onClick={() => setIndex(key)}>
                                <div className="bg-gradient-to-r from-ppmb-blue-800 to-ppmb-blue-600 rounded-xl px-3 py-[5px] text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex whitespace-nowrap">{dateToIndonesianString(timeline.startDate)} {timeline.startDate.getTime() != timeline.endDate.getTime() && `— ${dateToIndonesianString(timeline.endDate)}` }</div>
                                <span className="font-semibold text-xl text-ppmb-800 whitespace-nowrap">{timeline.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full px-12 hidden lg:flex">
                <div className="flex flex-row justify-between w-full p-[52px] rounded-2xl border-[2px] bg-ppmb-50 border-ppmb-blue-700 max-h-[300px]">
                    <div className="w-[75%] flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <text className="text-4xl font-semibold">{TIMELINES[index].name}</text>
                            <div className="flex">
                                <div className="bg-gradient-to-r from-ppmb-blue-800 to-ppmb-blue-600 rounded-xl px-3 py-1 text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex">{dateToIndonesianString(TIMELINES[index].startDate)} {TIMELINES[index].startDate.getTime() != TIMELINES[index].endDate.getTime() && `— ${dateToIndonesianString(TIMELINES[index].endDate)}` }</div>
                            </div>
                        </div>

                        <div>{TIMELINES[index].description}</div>

                        {TIMELINES[index].rsvp && <div className="flex h-full mt-4">
                            <div className="self-end">
                                <Link href={TIMELINES[index].rsvp} target="_blank" rel="noopener noreferrer">
                                    <Button label="RSVP" size="md"/>
                                </Link>
                            </div>
                        </div>}

                        {TIMELINES[index].zoom && <div className="flex h-full mt-4">
                            <div className="self-end">
                                <Link href={TIMELINES[index].zoom} target="_blank" rel="noopener noreferrer">
                                    <Button label="Zoom" size="md" leftIcon={<TbBrandZoom />}/>
                                </Link>
                            </div>
                        </div>}
                    </div>

                    <div className="w-[25%] flex items-center justify-end">
                        <Image 
                            alt="timeline-img"
                            src={TIMELINES[index].img}
                            width={210}
                            height={210}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden flex-col h-full items-start px-8">
                {TIMELINES.map((timeline, key) => (
                    <div key={key} className="flex w-full h-full flex-row gap-5">
                        <div
                            className={`relative ${key == 0 && 'rounded-t-lg'} ${key == TIMELINES.length - 1 && 'rounded-b-lg'} flex min-h-[100px] min-w-[4px] bg-ppmb-300`}
                        >
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-ppmb-blue-600 rounded-full"></div>
                        </div>

                        <div className={`${key == 0 ? 'mb-3' : key == TIMELINES.length - 1 ? 'mt-3' : 'my-3'} p-4 flex flex-row justify-between w-full rounded-lg border-[2px] border-ppmb-300`}>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <text className="text-xl font-semibold">{timeline.name}</text>
                                    <div className="flex">
                                        <div className="bg-gradient-to-r from-ppmb-blue-800 to-ppmb-blue-600 rounded-xl px-3 py-1 text-sm font-medium text-ppmb-000 min-w-[110px] justify-center flex">{dateToIndonesianString(timeline.startDate)} {timeline.startDate.getTime() != timeline.endDate.getTime() && `— ${dateToIndonesianString(timeline.endDate)}` }</div>
                                    </div>
                                </div>  

                                <div className="text-xs">{timeline.description}</div>

                                {timeline.rsvp && <div className="flex h-full mt-4">
                                    <div className="self-end">
                                        <Link href={timeline.rsvp} target="_blank" rel="noopener noreferrer">
                                            <Button label="RSVP" size="md"/>
                                        </Link>
                                    </div>
                                </div>}

                                {timeline.zoom && <div className="flex h-full mt-4">
                                    <div className="self-end">
                                        <Link href={timeline.zoom} target="_blank" rel="noopener noreferrer">
                                            <Button label="Zoom" size="md" leftIcon={<TbBrandZoom />}/>
                                        </Link>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
