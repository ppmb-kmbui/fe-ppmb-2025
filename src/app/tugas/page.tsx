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
    secondFossibDone: boolean
    insightHuntingDone: boolean
}

interface AssingmentProps {
    name: string
    description: string
    deadline: string
    icon: React.ReactNode
    isFinished: boolean
    type: "file" | "input" | "image"
    namingFormat?: string
    template?: string
    rsvp?: string
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
            name: "Insight Hunting",
            description: "Melalui Insight Hunting, diharapkan maba mendapatkan wawasan dari narasumber yang berpengalaman di beberapa kategori yang diminati.",
            deadline: "29/08/2024",
            icon: <HiOutlineLightBulb />,
            isFinished: false,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling2",
            type: "file",
            rsvp: "https://docs.google.com/forms/d/e/1FAIpQLScIHbDL7w-SaY_sDy-z7wabRaBLVKIRZ3CfwIQuJEuQD73S7Q/viewform",
            template: "https://docs.google.com/document/d/1Z3engQq3QwqyE2HjhTSxwxJchf2brPr7/edit",
            vbg: "https://drive.google.com/file/d/18QDIWk0txOuxGM6OvyFeOjTdo8urAyC6/view?usp=drive_link"
        },
        {
            name: "Fossib: Sharing Insight",
            description: "Maba dan kakak asuh melakukan sharing bersama untuk dapat saling mengenal dan bertukar wawasan mengenai kehidupan perkuliahan.",
            deadline: "29/08/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.firstFossibDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling1",
            type: "file",
            template: ""
        },
        {
            name: "Fossib: Fun Activity",
            description: "Setelah sharing insight, maba dan kakak asuh melakukan kegiatan bersama untuk dapat saling mendekatkan diri.",
            deadline: "29/08/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.secondFossibDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling2",
            type: "file",
            template: ""
        },
        {
            name: "Networking Kating 2023",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2023.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished: false,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2023_[nomor].pdf",
            type: "file",
            template: ""
        },
        {
            name: "Networking Kating 2022",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2022.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished: false,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2022_[nomor].pdf",
            type: "file",
            template: ""
        },
        {
            name: "Networking Kating 2021",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2021.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished: false,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2021_[nomor].pdf",
            type: "file",
            template: ""
        },
        {
            name: "Mentoring: Self Reflection",
            description: "Setelah tiap sesi mentoring, maba diharapkan dapat menulis rangkuman intisari dari kegiatan yang dilakukan sesuai kreativitas masing-masing.",
            deadline: "11/09/2024",
            icon: <HiOutlineDocumentText />,
            isFinished: false,
            namingFormat: "[Nama Lengkap]_[Fakultas]_SelfReflection",
            type: "image",
            template: ""
        },
        {
            name: "Mentoring: Vlog",
            description: "Vlog berisi  cuplikan kegiatan selama mentoring dengan durasi maksimal 3 menit, dikumpulkan oleh ketua kelompok.",
            deadline: "11/09/2024",
            icon: <HiOutlineDocumentText />,
            isFinished: false,
            namingFormat: "[Nomor Kelompok]_[Nama Kelompok]_Vlog",
            type: "input",
        },
        {
            name: "KMBUI Explorer",
            description: "Maba mengikuti paling sedikit 2 proker yang diadakan oleh KMBUI agar lebih mengenali KMBUI dan nilai-nilai Buddhis.",
            deadline: "11/09/2024",
            icon: <HiOutlineUsers />,
            isFinished: false,
            namingFormat: "[Nama Lengkap]_[Fakultas]_KMBUIExplorer",
            type: "image",
            template: ""
        },
    ]

    // console.log(progress);
    // console.log(ASSINGMENTS);

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

                    <div className="flex flex-col gap-5 w-full">
                        {ASSINGMENTS.map((assignment, key) => (
                            <div className={`${assignment.isFinished == true && "hidden"}`}>
                                <TaskCard key={key} {...assignment}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Sudah Dikumpulkan</text>

                    <div className="flex flex-col gap-5">
                        {ASSINGMENTS.map((assingment, key) => (
                            <div className={`${assingment.isFinished == false && "hidden"}`}>
                                <TaskCard key={key} {...assingment}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(TugasPage, 'freshman');