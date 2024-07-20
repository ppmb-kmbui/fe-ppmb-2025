"use client"

import { Header, LoadingScreen, MultiProgressBar, ProgressBar, TaskCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineUsers } from "react-icons/hi";

interface ProgressDetailProps {
    progress: number
    min: number
}

interface ProgressRumpunProps {
    SAINTEK: ProgressDetailProps
    SOSHUM: ProgressDetailProps
    RIK_VOK: ProgressDetailProps
}

interface NetworkingAngkatanProgressProps {
    progress: ProgressRumpunProps
    min: number
}

interface NetworkingKatingProgressProps {
    2021: ProgressDetailProps
    2022: ProgressDetailProps
    2023: ProgressDetailProps
}

interface ProgressProps {
    networkingAngkatan: NetworkingAngkatanProgressProps
    networkingKating: NetworkingKatingProgressProps
    firstFossibDone: boolean
    secondFosibDone: boolean
    insightHuntingDone: true
}

interface AssingmentProps {
    name: string
    description: string
    deadline: string
    icon: React.ReactNode
    isFinished: boolean
    namingFormat?: string
    type: "file" | "input" | "networking"
    template?: string
    vbg?: string
}

const TugasPage: React.FC = () => {
    const { token } = useAuth();

    const [progress, setProgress] = useState<ProgressProps>({} as any)
    const [isFetching, setIsFetching] = useState<boolean>(true);


    const getData = async () => {
        try {
            setIsFetching(true);
            const res = await api({
                url: 'api/tasks',
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProgress(res.data)

        } catch (error: any) {
            console.error("Error while fetching assingment's progress")
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    console.log(progress);

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

    const ASSINGMENTS: AssingmentProps[] = [
        {
            name: "Fossib: Sharing Insight",
            description: "Maba dan kakak asuh melakukan sharing bersama untuk dapat saling mengenal dan bertukar wawasan mengenai kehidupan perkuliahan.",
            deadline: "29/08/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.firstFossibDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling1",
            type: "file"
        },
        // {
        //     name: "Insight Hunting",
        //     description: "Ini bukan deskripsi insight hunting sebenarnya, Ini bukan deskripsi insight hunting sebenarnya",
        //     deadline: "23/07/2024",
        //     template: "",
        //     icon: <HiOutlineLightBulb />,
        //     type: "file",
        //     // isFinished: false
        // },
        // {
        //     name: "Foster Sibling",
        //     description: "Ini juga bukan deskripsi insight hunting sih.., Ini juga bukan deskripsi insight hunting sih..",
        //     deadline: "23/07/2024",
        //     template: "",
        //     icon: <HiOutlineUsers />,
        //     type: "file",
        //     // isFinished: true
        // },
        // {
        //     name: "Mentoring 3",
        //     description: "Mentoring tiga, kalo dua jadi mentoring dua, Mentoring tiga, kalo dua jadi mentoring dua",
        //     deadline: "23/07/2024",
        //     icon: <HiOutlineDocumentText />,
        //     type: "file",
        //     // isFinished: true
        // },
        // {
        //     name: "Mentoring 4 [VLOG]",
        //     description: "Mentoring empat, kalo dua jadi mentoring dua, Mentoring empat, kalo dua jadi mentoring dua",
        //     deadline: "23/07/2024",
        //     icon: <HiOutlineDocumentText />,
        //     type: "input",
        //     // isFinished: true
        // },
        // {
        //     name: "Mentoring 4 [PPT]",
        //     description: "Mentoring empat, kalo dua jadi mentoring dua, Mentoring empat, kalo dua jadi mentoring dua",
        //     deadline: "23/07/2024",
        //     template: "",
        //     icon: <HiOutlineDocumentText />,
        //     type: "file",
        // },
    ]

    return (
        isFetching ? <LoadingScreen /> : 
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
                        {ASSINGMENTS.map((data, key) => (
                            <TaskCard {...data}/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Sudah Dikumpulkan</text>

                    <div className="flex flex-col gap-5">
                        {ASSINGMENTS.map((data, key) => (
                            <TaskCard {...data}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(TugasPage, 'freshman');