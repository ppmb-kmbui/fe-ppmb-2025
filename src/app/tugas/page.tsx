"use client"

import { ProgressBar, Task } from "@/components";
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
        <div className="min-h-screen flex flex-col gap-10">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-bold text-2xl font-crimson text-ppmb-000">
                    To Do PPMB KMBUI
                </text>

                <Image
                    src={require("../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="flex flex-col items-center gap-3">
                <text className="font-crimson text-3xl">Progress Tugas</text>

                <div className="flex flex-col gap-2">
                    {DUMMY_DATA_PROGRESS.map((data, key) => (
                        <ProgressBar key={key} {...data}/>
                    ))}
                </div>
            </div>

            <div className="flex justify-evenly px-[60px] gap-10 mt-5">
                <div className="flex flex-col gap-3">
                    <text className="text-3xl font-crimson">Perlu Dikerjakan</text>

                    <div className="flex flex-col gap-5">
                        {DUMMY_DATA_TUGAS.map((data, key) => (
                            <Task {...data}/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <text className="text-3xl font-crimson">Sudah Dikumpulkan</text>

                    <div className="flex flex-col gap-5">
                        {DUMMY_DATA_TUGAS.map((data, key) => (
                            <Task {...data}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TugasPage;