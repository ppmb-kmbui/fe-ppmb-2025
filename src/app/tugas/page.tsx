"use client"

import { Header, MultiProgressBar, ProgressBar, TaskCard } from "@/components";
import Image from "next/image";
import { HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineUsers } from "react-icons/hi";

const TugasPage: React.FC = () => {
    const DUMMY_DATA_PROGRESS = [
        {
            label: "Mentoring",
            currentProgress: 2,
            totalProgress: 3
        },
        {
            label: "Insight Hunting",
            currentProgress: 0,
            totalProgress: 1
        },
        {
            label: "Foster Sibling",
            currentProgress: 1,
            totalProgress: 1
        },
        {
            label: "KMBUI Explorer",
            currentProgress: 0,
            totalProgress: 1
        },
    ]

    const DUMMY_DATA_TUGAS = [
        {
            name: "Absensi - Grand Closing",
            description: "Ini ceritanya deskripsi absensi, Ini ceritanya deskripsi absensi, Ini ceritanya deskripsi absensi",
            deadline: "23/07/2024",
            icon: <HiOutlineClipboardList />,
            type: "input",
            // isFinished: false
        },
        {
            name: "Networking",
            description: "Ini ceritanya deskripsi networking dan networqueen, Ini ceritanya deskripsi networking dan networqueen",
            deadline: "23/07/2024",
            icon: <HiOutlineChatAlt2 />,
            // isFinished: false
        },
        {
            name: "Insight Hunting",
            description: "Ini bukan deskripsi insight hunting sebenarnya, Ini bukan deskripsi insight hunting sebenarnya",
            deadline: "23/07/2024",
            template: "",
            icon: <HiOutlineLightBulb />,
            type: "file",
            // isFinished: false
        },
        {
            name: "Foster Sibling",
            description: "Ini juga bukan deskripsi insight hunting sih.., Ini juga bukan deskripsi insight hunting sih..",
            deadline: "23/07/2024",
            template: "",
            icon: <HiOutlineUsers />,
            type: "file",
            // isFinished: true
        },
        {
            name: "Mentoring 3",
            description: "Mentoring tiga, kalo dua jadi mentoring dua, Mentoring tiga, kalo dua jadi mentoring dua",
            deadline: "23/07/2024",
            icon: <HiOutlineDocumentText />,
            type: "file",
            // isFinished: true
        },
        {
            name: "Mentoring 4 [VLOG]",
            description: "Mentoring empat, kalo dua jadi mentoring dua, Mentoring empat, kalo dua jadi mentoring dua",
            deadline: "23/07/2024",
            icon: <HiOutlineDocumentText />,
            type: "input",
            // isFinished: true
        },
        {
            name: "Mentoring 4 [PPT]",
            description: "Mentoring empat, kalo dua jadi mentoring dua, Mentoring empat, kalo dua jadi mentoring dua",
            deadline: "23/07/2024",
            template: "",
            icon: <HiOutlineDocumentText />,
            type: "file",
        },
    ]

    return (
        <div className="min-h-screen flex flex-col gap-5 lg:gap-10">
            <Header label="Tugas" subLabel="PPMB KMBUI"/>

            <div className="flex flex-col items-center gap-3">
                <text className="text-2xl lg:text-3xl font-semibold">Progress Tugas</text>

                <div className="flex flex-col gap-2 items-center">
                    <MultiProgressBar />
                    <MultiProgressBar />

                    {DUMMY_DATA_PROGRESS.map((data, key) => (
                        <ProgressBar key={key} {...data}/>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-evenly px-8 lg:px-[80px] gap-10 lg:gap-[80px] mt-5 pb-10">
                <div className="flex flex-col gap-2">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Belum Dikerjakan</text>

                    <div className="flex flex-col gap-5">
                        {DUMMY_DATA_TUGAS.map((data, key) => (
                            <TaskCard {...data}/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Sudah Dikumpulkan</text>

                    <div className="flex flex-col gap-5">
                        {DUMMY_DATA_TUGAS.map((data, key) => (
                            <TaskCard {...data}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TugasPage;